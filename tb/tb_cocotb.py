#******************************************************************************
# file:    tb_cocotb.py
#
# author:  JAY CONVERTINO
#
# date:    2024/12/09
#
# about:   Brief
# Cocotb test bench
#
# license: License MIT
# Copyright 2024 Jay Convertino
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.
#
#******************************************************************************

import random
import itertools

import cocotb
from cocotb.clock import Clock
from cocotb.triggers import FallingEdge, RisingEdge, Timer, Event
from cocotb.binary import BinaryValue
from cocotbext.axi import (AxiStreamBus, AxiStreamSource, AxiStreamSink, AxiStreamMonitor, AxiStreamFrame)

# Function: create_string
# Return a string equal to the core output
#
# Parameters:
#   dut - device under test passed from cocotb test function
#   tx_frame - transmitted frame data
#
# Returns: String
def create_string(dut, tx_frame):
  user_width = int(dut.USER_WIDTH.value/4)
  dest_width = int(dut.DEST_WIDTH.value/4)

  temp = ""

  temp += f'{dut.DATA_PREFIX.value.decode()}'
  temp += f'{tx_frame.tdata.hex()}'.upper()
  temp += f'{dut.DELIMITER.value.decode()}'
  temp += f'{dut.USER_PREFIX.value.decode()}'
  temp += f'{tx_frame.tuser:0{user_width}x}'.upper()
  temp += f'{dut.DELIMITER.value.decode()}'
  temp += f'{dut.DEST_PREFIX.value.decode()}'
  temp += f'{tx_frame.tdest:0{dest_width}x}'.upper()
  temp += f'{dut.TERMINATION.value.decode()}'

  return temp

# Function: random_bool
# Return a infinte cycle of random bools
#
# Returns: List
def random_bool():
  temp = []

  for x in range(0, 256):
    temp.append(bool(random.getrandbits(1)))

  return itertools.cycle(temp)

# Function: start_clock
# Start the simulation clock generator.
#
# Parameters:
#   dut - Device under test passed from cocotb test function
def start_clock(dut):
  cocotb.start_soon(Clock(dut.aclk, 2, units="ns").start())

# Function: reset_dut
# Cocotb coroutine for resets, used with await to make sure system is reset.
#
# Parameters:
#   dut - Device under test passed from cocotb.
async def reset_dut(dut):
  dut.arstn.value = 0
  await Timer(5, units="ns")
  dut.arstn.value = 1

# Function: conversion_test
# Coroutine that is identified as a test routine. This routine tests for correct output of strings
# by comparing to a python genrated version.
#
# Parameters:
#   dut - Device under test passed from cocotb.
@cocotb.test()
async def conversion_test(dut):

    start_clock(dut)

    axis_source = AxiStreamSource(AxiStreamBus.from_prefix(dut, "s_axis"), dut.aclk, dut.arstn, False)
    axis_sink = AxiStreamSink(AxiStreamBus.from_prefix(dut, "m_axis"), dut.aclk, dut.arstn, False)

    await reset_dut(dut)

    for x in range(0, 256):
        output_string = ""
        rx_frames = []

        data = x.to_bytes(length = 1, byteorder='little') * dut.SBUS_WIDTH.value
        tx_frame = AxiStreamFrame(data, tdest=x%(2**dut.s_axis_tdest.value.n_bits), tuser=(x-255)%(2**dut.s_axis_tuser.value.n_bits), tx_complete=Event())

        await axis_source.send(tx_frame)
        await tx_frame.tx_complete.wait()

        await RisingEdge(dut.m_axis_tvalid)

        while dut.m_axis_tvalid.value.integer == 1:
          rx_frame = await axis_sink.recv()
          rx_frames.append(rx_frame)
          await RisingEdge(dut.aclk)

        for rx_frame in rx_frames:
          output_string += rx_frame.tdata.decode()

        assert output_string == create_string(dut, tx_frame), "Python generator string does not equal core string"

    await RisingEdge(dut.aclk)

    assert dut.s_axis_tready.value[0] == 1, "tready is not 1!"

# Function: conversion_test_random_ready
# Coroutine that is identified as a test routine. This routine tests for correct output of strings
# by comparing to a python genrated version, with ready randomized.
#
# Parameters:
#   dut - Device under test passed from cocotb.
@cocotb.test()
async def conversion_test_random_ready(dut):

    start_clock(dut)

    axis_source = AxiStreamSource(AxiStreamBus.from_prefix(dut, "s_axis"), dut.aclk, dut.arstn, False)
    axis_sink = AxiStreamSink(AxiStreamBus.from_prefix(dut, "m_axis"), dut.aclk, dut.arstn, False)

    axis_sink.set_pause_generator(random_bool())

    await reset_dut(dut)

    for x in range(0, 256):
        output_string = ""
        rx_frames = []

        data = x.to_bytes(length = 1, byteorder='little') * dut.SBUS_WIDTH.value
        tx_frame = AxiStreamFrame(data, tdest=x%(2**dut.s_axis_tdest.value.n_bits), tuser=(x-255)%(2**dut.s_axis_tuser.value.n_bits), tx_complete=Event())

        await axis_source.send(tx_frame)
        await tx_frame.tx_complete.wait()

        await RisingEdge(dut.m_axis_tvalid)

        while dut.m_axis_tvalid.value.integer == 1:
          rx_frame = await axis_sink.recv()
          rx_frames.append(rx_frame)
          await RisingEdge(dut.aclk)

        for rx_frame in rx_frames:
          output_string += rx_frame.tdata.decode()

        assert output_string == create_string(dut, tx_frame), "Python generator string does not equal core string"

    axis_sink.clear_pause_generator()

    axis_sink.pause = False

    await RisingEdge(dut.aclk)

    assert dut.s_axis_tready.value[0] == 1, "tready is not 1!"

# Function: in_reset
# Coroutine that is identified as a test routine. This routine tests if device stays
# in unready state when in reset.
#
# Parameters:
#   dut - Device under test passed from cocotb.
@cocotb.test()
async def in_reset(dut):

    start_clock(dut)

    dut.m_axis_tready.value = 0

    dut.arstn.value = 0

    await Timer(10, units="ns")

    assert dut.s_axis_tready.value.integer == 0, "tready is 1!"

# Function: no_clock
# Coroutine that is identified as a test routine. This routine tests if no ready when clock is lost
# and device is left in reset.
#
# Parameters:
#   dut - Device under test passed from cocotb.
@cocotb.test()
async def no_clock(dut):

    dut.m_axis_tready.value = 0

    dut.arstn.value = 0

    dut.aclk.value = 0

    await Timer(5, units="ns")

    assert dut.s_axis_tready.value.integer == 0, "tready is 1!"
