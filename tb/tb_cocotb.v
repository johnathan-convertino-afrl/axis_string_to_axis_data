//******************************************************************************
// file:    tb_cocotb.v
//
// author:  JAY CONVERTINO
//
// date:    2024/12/12
//
// about:   Brief
// Test bench wrapper for cocotb
//
// license: License MIT
// Copyright 2024 Jay Convertino
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
//******************************************************************************

 `timescale 1ns/100ps

/*
 * Module: tb_cocotb
 *
 * Test bench for string to data converter. This will run a file through the system
 * and write its output. These can then be compared to check for errors.
 * If the files are identical, no errors. A FST file will be written.
 *
 * Parameters:
 *
 *    DELIMITER   - break value between multple strings
 *    TERMINATION - termination value of full string from serial port, byte only. (\n = 0A \r = 0D).
 *    STRING_LEN  - max lenth of string including delimiter
 *    MBUS_WIDTH  - bus width of master (data) output
 *    USER_WIDTH  - user width of master bus, only in 4 bit nibbles, and at least 4 bits.
 *    DEST_WIDTH  - dest width of master bus, only in 4 bit nibbles, and at least 4 bits.
 *    PREFIX_LEN  - length of following prefix strings in bytes.
 *    DATA_PREFIX - prefix for data hex strings
 *    DEST_PREFIX - prefix for destination hex strings
 *    USER_PREFIX - prefix for user hex strings
 *    KEYWORD_LEN - length of the following keywords
 *    SET_KEYWORD - keyword to output data over tdata,tuser,tdest on master interface.
 *    CLR_KEYWORD - keyword to clear output data and buffers of master interface.
 *
 * Ports:
 *
 *   aclk           - Clock for AXIS
 *   arstn          - Negative reset for AXIS
 *   m_axis_tdata   - Output data
 *   m_axis_tvalid  - When active high the output data is valid
 *   m_axis_tuser   - Output user data
 *   m_axis_tdest   - Output destination data
 *   m_axis_tready  - When set active high the output device is ready for data.
 *   s_axis_tdata   - Input string data
 *   s_axis_tvalid  - When set active high the input data is valid
 *   s_axis_tready  - When active high the device is ready for input data.
 */
module tb_cocotb #(
    parameter DELIMITER   = ";",
    parameter TERMINATION = "\n",
    parameter STRING_LEN  = 4,
    parameter MBUS_WIDTH  = 1,
    parameter USER_WIDTH  = 4,
    parameter DEST_WIDTH  = 4,
    parameter PREFIX_LEN  = 1,
    parameter DATA_PREFIX = "#",
    parameter DEST_PREFIX = "&",
    parameter USER_PREFIX = "*",
    parameter KEYWORD_LEN = 3,
    parameter SET_KEYWORD = "set",
    parameter CLR_KEYWORD = "clr"
  )
  (
    input                       aclk,
    input                       arstn,
    output [(MBUS_WIDTH*8)-1:0] m_axis_tdata,
    output                      m_axis_tvalid,
    output [USER_WIDTH-1:0]     m_axis_tuser,
    output [DEST_WIDTH-1:0]     m_axis_tdest,
    input                       m_axis_tready,
    input  [7:0]                s_axis_tdata,
    input                       s_axis_tvalid,
    output                      s_axis_tready
  );

  // fst dump command
  initial begin
    $dumpfile ("tb_cocotb.fst");
    $dumpvars (0, tb_cocotb);
    #1;
  end
  
  //Group: Instantiated Modules

  /*
   * Module: dut
   *
   * Device under test, axis_string_to_axis_data
   */
  axis_string_to_axis_data #(
    .DELIMITER(DELIMITER),
    .TERMINATION(TERMINATION),
    .STRING_LEN(STRING_LEN),
    .MBUS_WIDTH(MBUS_WIDTH),
    .USER_WIDTH(USER_WIDTH),
    .DEST_WIDTH(DEST_WIDTH),
    .PREFIX_LEN(PREFIX_LEN),
    .DATA_PREFIX(DATA_PREFIX),
    .DEST_PREFIX(DEST_PREFIX),
    .USER_PREFIX(USER_PREFIX),
    .KEYWORD_LEN(KEYWORD_LEN),
    .SET_KEYWORD(SET_KEYWORD),
    .CLR_KEYWORD(CLR_KEYWORD)
  ) dut (
    .aclk(aclk),
    .arstn(arstn),
    .m_axis_tdata(m_axis_tdata),
    .m_axis_tvalid(m_axis_tvalid),
    .m_axis_tuser(m_axis_tuser),
    .m_axis_tdest(m_axis_tdest),
    .m_axis_tready(m_axis_tready),
    .s_axis_tdata(s_axis_tdata),
    .s_axis_tvalid(s_axis_tvalid),
    .s_axis_tready(s_axis_tready)
  );
  
endmodule

