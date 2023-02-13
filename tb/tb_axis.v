//******************************************************************************
/// @file    tb_axis.v
/// @author  JAY CONVERTINO
/// @date    2022.10.24
/// @brief   Generic AXIS test bench top with verification.
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

`timescale 1 ns/10 ps

module tb_axis;
  //parameter or local param bus, user and dest width? and files as well? 
  
  localparam BUS_WIDTH  = 1;
  localparam USER_WIDTH = 4;
  localparam DEST_WIDTH = 4;
  
  localparam CLK_PERIOD = 500;
  localparam RST_PERIOD = 1000;
  
  wire                      tb_dut_clk;
  wire                      tb_dut_rstn;
  wire                      tb_dut_valid;
  wire                      tb_dut_ready;
  wire [(BUS_WIDTH*8)-1:0]  tb_dut_data;
  wire [BUS_WIDTH-1:0]      tb_dut_keep;
  wire                      tb_dut_last;
  wire [USER_WIDTH-1:0]     tb_dut_user;
  wire [DEST_WIDTH-1:0]     tb_dut_dest;
  
  wire                      tb_stim_clk;
  wire                      tb_stim_rstn;
  wire                      tb_stim_valid;
  wire [(BUS_WIDTH*8)-1:0]  tb_stim_data;
  wire [BUS_WIDTH-1:0]      tb_stim_keep;
  wire                      tb_stim_last;
  wire [USER_WIDTH-1:0]     tb_stim_user;
  wire [DEST_WIDTH-1:0]     tb_stim_dest;
  
  reg         tb_cnt_clk  = 0;
  reg         tb_cnt_rstn = 0;
  wire [8:0]  tb_cnt_data;
  
  // fst dump command
  initial begin
    $dumpfile ("tb_axis.fst");
    $dumpvars (0, tb_axis);
    #1;
  end
  
  clk_stimulus #(
    .CLOCKS(1), // # of clocks
    .CLOCK_BASE(1000000), // clock time base mhz
    .CLOCK_INC(1000), // clock time diff mhz
    .RESETS(1), // # of resets
    .RESET_BASE(2000), // time to stay in reset
    .RESET_INC(100) // time diff for other resets
  ) clk_stim (
    //clk out ... maybe a vector of clks with diff speeds.
    .clkv(tb_dut_clk),
    //rstn out ... maybe a vector of rsts with different off times
    .rstnv(tb_dut_rstn),
    .rstv()
  );
  
  slave_axis_stimulus #(
    .BUS_WIDTH(BUS_WIDTH),
    .USER_WIDTH(USER_WIDTH),
    .DEST_WIDTH(DEST_WIDTH),
    .FILE("in.txt")
  ) slave_axis_stim (
    // output to slave
    .m_axis_aclk(tb_dut_clk),
    .m_axis_arstn(tb_dut_rstn),
    .m_axis_tvalid(tb_stim_valid),
    .m_axis_tready(tb_stim_ready),
    .m_axis_tdata(tb_stim_data),
    .m_axis_tkeep(tb_stim_keep),
    .m_axis_tlast(tb_stim_last),
    .m_axis_tuser(tb_stim_user),
    .m_axis_tdest(tb_stim_dest)
  );
  
  axis_string_to_axis_data #(
    .DELIMITER(";"),        
    .TERMINATION("\n"),     
    .STRING_LEN(4),      
    .MBUS_WIDTH(BUS_WIDTH),
    .USER_WIDTH(USER_WIDTH),
    .DEST_WIDTH(DEST_WIDTH),
    .PREFIX_LEN(1),
    .DATA_PREFIX("#"),
    .DEST_PREFIX("&"),
    .USER_PREFIX("*"),
    .KEYWORD_LEN(3),
    .SET_KEYWORD("set"),
    .CLR_KEYWORD("clr")
  ) dut (
    //axi streaming clock and reset.
    .aclk(tb_dut_clk),
    .arstn(tb_dut_rstn),
    //1553
    //master data out interface
    .m_axis_tdata(tb_dut_data),
    .m_axis_tvalid(tb_dut_valid),
    .m_axis_tuser(tb_dut_user),
    .m_axis_tdest(tb_dut_dest),
    .m_axis_tready(tb_dut_ready),
    //slave data in interface
    .s_axis_tdata(tb_stim_data),
    .s_axis_tvalid(tb_stim_valid),
    .s_axis_tready(tb_stim_ready)
  );
  
  master_axis_stimulus #(
    .BUS_WIDTH(BUS_WIDTH),
    .USER_WIDTH(USER_WIDTH),
    .DEST_WIDTH(DEST_WIDTH),
    .FILE("out.bin")
  ) master_axis_stim (
    // write
    .s_axis_aclk(tb_dut_clk),
    .s_axis_arstn(tb_dut_rstn),
    .s_axis_tvalid(tb_dut_valid),
    .s_axis_tready(tb_dut_ready),
    .s_axis_tdata(tb_dut_data),
    .s_axis_tkeep({BUS_WIDTH{1'b1}}),
    .s_axis_tlast(1'b0),
    .s_axis_tuser(tb_dut_user),
    .s_axis_tdest(tb_dut_dest)
  );
  
endmodule

