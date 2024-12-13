//******************************************************************************
// file:    axis_string_to_axis_data.v
//
// author:  JAY CONVERTINO
//
// date:    2022/09/19
//
// about:   Brief
// Take input string data and process it into tuser/tdata output.
//
// license: License MIT
// Copyright 2022 Jay Convertino
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
 * Module: axis_string_to_axis_data
 *
 * Convert string data to raw binary data for axis bus.
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
module axis_string_to_axis_data #(
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
  
  `include "util_helper_math.vh"
  
  reg [(MBUS_WIDTH*8)-1:0]  r_m_axis_tdata;
  reg [USER_WIDTH-1:0]      r_m_axis_tuser;
  reg [DEST_WIDTH-1:0]      r_m_axis_tdest;
  reg                       r_m_axis_tvalid;
  reg [(MBUS_WIDTH*8)-1:0]  rr_m_axis_tdata;
  reg [USER_WIDTH-1:0]      rr_m_axis_tuser;
  reg [DEST_WIDTH-1:0]      rr_m_axis_tdest;
  
  reg [clogb2(STRING_LEN):0] counter;
  
  reg [STRING_LEN*8-1:0] char_buffer;
  
  integer index = 0;
  
  // ready if next core is ready.
  assign s_axis_tready = m_axis_tready;

  assign m_axis_tdata   = rr_m_axis_tdata;
  assign m_axis_tvalid  = r_m_axis_tvalid;
  assign m_axis_tuser   = rr_m_axis_tuser;
  assign m_axis_tdest   = rr_m_axis_tdest;

  // process string data into raw data
  always @(posedge aclk)
  begin
    if(arstn == 1'b0) begin
      rr_m_axis_tdata  <= 0;
      r_m_axis_tvalid  <= 0;
      rr_m_axis_tuser  <= 0;
      rr_m_axis_tdest  <= 0;
      
      r_m_axis_tdata <= 0;
      r_m_axis_tuser <= 0;
      r_m_axis_tdest <= 0;
      
      counter <= STRING_LEN;

      char_buffer <= 0;
    end else begin
      if(m_axis_tready == 1'b1) begin
        rr_m_axis_tdata  <= 0;
        r_m_axis_tvalid  <= 0;
        rr_m_axis_tuser  <= 0;
        rr_m_axis_tdest  <= 0;
      end
      
      if(s_axis_tvalid == 1'b1) begin 
        char_buffer[8*counter-1 -:8] <= s_axis_tdata;
        
        counter <= counter - 1;
        
        if(counter <= 1) begin
          char_buffer <= 0;
          counter     <= STRING_LEN;
        end
        
        // reset counter on string terminator or on string delimiter
        if((s_axis_tdata == TERMINATION) || (s_axis_tdata == DELIMITER)) begin
          char_buffer <= 0;
          counter     <= STRING_LEN;
          
          case(char_buffer[8*STRING_LEN-1 -:PREFIX_LEN*8])
            DATA_PREFIX : begin
              for(index = STRING_LEN-PREFIX_LEN; index > STRING_LEN-PREFIX_LEN-2*MBUS_WIDTH; index = index - 1) begin
                r_m_axis_tdata[4*(index-(STRING_LEN-PREFIX_LEN-2*MBUS_WIDTH))-1 -:4] <= char_buffer[8*index-1 -:8] - ((char_buffer[8*index-1 -:8] - 48) < 10 ? 48 : 55);
              end
            end
            DEST_PREFIX : begin
              for(index = STRING_LEN-PREFIX_LEN; index > STRING_LEN-PREFIX_LEN-DEST_WIDTH/4; index = index - 1) begin
                r_m_axis_tdest[4*(index-(STRING_LEN-PREFIX_LEN-DEST_WIDTH/4))-1 -:4] <= char_buffer[8*index-1 -:8] - ((char_buffer[8*index-1 -:8] - 48) < 10 ? 48 : 55);
              end
            end
            USER_PREFIX : begin
              for(index = STRING_LEN-PREFIX_LEN; index > STRING_LEN-PREFIX_LEN-USER_WIDTH/4; index = index - 1) begin
                r_m_axis_tuser[4*(index-(STRING_LEN-PREFIX_LEN-USER_WIDTH/4))-1 -:4] <= char_buffer[8*index-1 -:8] - ((char_buffer[8*index-1 -:8] - 48) < 10 ? 48 : 55);
              end
            end
          endcase
          
          case(char_buffer[8*STRING_LEN-1 -:8*KEYWORD_LEN])
            SET_KEYWORD : begin
              rr_m_axis_tdata  <= r_m_axis_tdata;
              r_m_axis_tvalid  <= 1'b1;
              rr_m_axis_tuser  <= r_m_axis_tuser;
              rr_m_axis_tdest  <= r_m_axis_tdest;
            end
            CLR_KEYWORD : begin
              r_m_axis_tdata <= 0;
              r_m_axis_tuser <= 0;
              r_m_axis_tdest <= 0;
            end
          endcase
        end
      end
    end
  end
endmodule
