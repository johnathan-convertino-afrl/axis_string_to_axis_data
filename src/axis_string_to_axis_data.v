//******************************************************************************
/// @FILE    axis_string_to_axis_data.v
/// @AUTHOR  JAY CONVERTINO
/// @DATE    2022.09.19
/// @BRIEF   AXIS STRING TO AXIS DATA
/// @DETAILS Take input string data and process it into tuser/tdata output.
///
/// @LICENSE MIT
///  Copyright 2022 Jay Convertino
///
///  Permission is hereby granted, free of charge, to any person obtaining a copy
///  of this software and associated documentation files (the "Software"), to 
///  deal in the Software without restriction, including without limitation the
///  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
///  sell copies of the Software, and to permit persons to whom the Software is 
///  furnished to do so, subject to the following conditions:
///
///  The above copyright notice and this permission notice shall be included in 
///  all copies or substantial portions of the Software.
///
///  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
///  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
///  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
///  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
///  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
///  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
///  IN THE SOFTWARE.
//******************************************************************************

`timescale 1ns/100ps

/// @brief axis string to axis data module
module axis_string_to_axis_data #(
    parameter DELIMITER   = ";",        ///< break value between multple strings
    parameter TERMINATION = "\n",       ///< termination value of full string from serial port, byte only. (\n = 0A \r = 0D).
    parameter STRING_LEN  = 4,          ///< max lenth of string including delimiter
    parameter MBUS_WIDTH  = 1,          ///< bus width of master (data) output
    parameter USER_WIDTH  = 4,          ///< user width of master bus, only in 4 bit nibbles, and at least 4 bits.
    parameter DEST_WIDTH  = 4,          ///< dest width of master bus, only in 4 bit nibbles, and at least 4 bits.
    parameter PREFIX_LEN  = 1,          ///< length of following prefix strings in bytes.
    parameter DATA_PREFIX = "#",        ///< prefix for data hex strings
    parameter DEST_PREFIX = "&",        ///< prefix for destination hex strings
    parameter USER_PREFIX = "*",        ///< prefix for user hex strings
    parameter KEYWORD_LEN = 3,          ///< length of the following keywords
    parameter SET_KEYWORD = "set",      ///< keyword to output data over tdata,tuser,tdest on master interface.
    parameter CLR_KEYWORD = "clr"       ///< keyword to clear output data and buffers of master interface.
  )
  (
    //axi streaming clock and reset.
    input aclk,
    input arstn,
    //master output axis
    output reg [(MBUS_WIDTH*8)-1:0] m_axis_tdata,
    output reg                      m_axis_tvalid,
    output reg [USER_WIDTH-1:0]     m_axis_tuser,
    output reg [DEST_WIDTH-1:0]     m_axis_tdest,
    input                           m_axis_tready,
    //slave input axis
    input  [7:0]  s_axis_tdata,
    input         s_axis_tvalid,
    output        s_axis_tready
  );
  
  `include "util_helper_math.vh"
  
  reg [(MBUS_WIDTH*8)-1:0]  r_m_axis_tdata;
  reg [USER_WIDTH-1:0]      r_m_axis_tuser;
  reg [DEST_WIDTH-1:0]      r_m_axis_tdest;
  
  reg [clogb2(STRING_LEN):0] counter;
  
  reg [STRING_LEN*8-1:0] char_buffer;
  
  integer index = 0;
  
  // ready if next core is ready.
  assign s_axis_tready = m_axis_tready;

  always @(posedge aclk)
  begin
    if(arstn == 1'b0) begin
      m_axis_tdata  <= 0;
      m_axis_tvalid <= 0;
      m_axis_tuser  <= 0;
      m_axis_tdest  <= 0;
      
      r_m_axis_tdata <= 0;
      r_m_axis_tuser <= 0;
      r_m_axis_tdest <= 0;
      
      counter <= STRING_LEN;

      char_buffer <= 0;
    end else begin
      if(m_axis_tready == 1'b1) begin
        m_axis_tdata  <= 0;
        m_axis_tvalid <= 0;
        m_axis_tuser  <= 0;
        m_axis_tdest  <= 0;
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
              m_axis_tdata  <= r_m_axis_tdata;
              m_axis_tvalid <= 1'b1;
              m_axis_tuser  <= r_m_axis_tuser;
              m_axis_tdest  <= r_m_axis_tdest;
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
