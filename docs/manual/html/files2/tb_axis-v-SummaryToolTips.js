﻿NDSummary.OnToolTipsLoaded("File2:tb_axis.v",{44:"<div class=\"NDToolTip TInformation LSystemVerilog\"><div class=\"TTSummary\">Test bench for axis_string_to_axis_data using axis stim and clock stim.</div></div>",45:"<div class=\"NDToolTip TInformation LSystemVerilog\"><div class=\"TTSummary\">Copyright 2022 Jay Convertino</div></div>",46:"<div class=\"NDToolTip TModule LSystemVerilog\"><div id=\"NDPrototype46\" class=\"NDPrototype\"><div class=\"PSection PPlainSection\"><span class=\"SHKeyword\">module</span> tb_axis</div></div><div class=\"TTSummary\">Test bench for axis_string_to_axis_data. This will run a file through the system and write its output. These can then be compared to check for errors.&nbsp; If the files are identical, no errors. A FST file will be written.</div></div>",48:"<div class=\"NDToolTip TModule LSystemVerilog\"><div id=\"NDPrototype48\" class=\"NDPrototype WideForm\"><div class=\"PSection PParameterSection CStyle\"><div class=\"PParameterCells\" data-WideColumnCount=\"4\" data-NarrowColumnCount=\"3\"><div class=\"PBeforeParameters\" data-WideGridArea=\"1/1/7/2\" data-NarrowGridArea=\"1/1/2/4\" style=\"grid-area:1/1/7/2\">clk_stimulus #(</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"1/2/2/3\" data-NarrowGridArea=\"2/1/3/2\" style=\"grid-area:1/2/2/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"1/3/2/4\" data-NarrowGridArea=\"2/2/3/3\" style=\"grid-area:1/3/2/4\">CLOCKS(<span class=\"SHNumber\">1</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"2/2/3/3\" data-NarrowGridArea=\"3/1/4/2\" style=\"grid-area:2/2/3/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"2/3/3/4\" data-NarrowGridArea=\"3/2/4/3\" style=\"grid-area:2/3/3/4\">CLOCK_BASE(<span class=\"SHNumber\">1000000</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"3/2/4/3\" data-NarrowGridArea=\"4/1/5/2\" style=\"grid-area:3/2/4/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"3/3/4/4\" data-NarrowGridArea=\"4/2/5/3\" style=\"grid-area:3/3/4/4\">CLOCK_INC(<span class=\"SHNumber\">1000</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"4/2/5/3\" data-NarrowGridArea=\"5/1/6/2\" style=\"grid-area:4/2/5/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"4/3/5/4\" data-NarrowGridArea=\"5/2/6/3\" style=\"grid-area:4/3/5/4\">RESETS(<span class=\"SHNumber\">1</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"5/2/6/3\" data-NarrowGridArea=\"6/1/7/2\" style=\"grid-area:5/2/6/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"5/3/6/4\" data-NarrowGridArea=\"6/2/7/3\" style=\"grid-area:5/3/6/4\">RESET_BASE(<span class=\"SHNumber\">2000</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"6/2/7/3\" data-NarrowGridArea=\"7/1/8/2\" style=\"grid-area:6/2/7/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"6/3/7/4\" data-NarrowGridArea=\"7/2/8/3\" style=\"grid-area:6/3/7/4\">RESET_INC(<span class=\"SHNumber\">100</span>)</div><div class=\"PAfterParameters NegativeLeftSpaceOnWide\" data-WideGridArea=\"6/4/7/5\" data-NarrowGridArea=\"8/1/9/4\" style=\"grid-area:6/4/7/5\">) clk_stim ( .clkv(tb_dut_clk), .rstnv(tb_dut_rstn), .rstv() )</div></div></div></div><div class=\"TTSummary\">Generate a 50/50 duty cycle set of clocks and reset.</div></div>",49:"<div class=\"NDToolTip TModule LSystemVerilog\"><div id=\"NDPrototype49\" class=\"NDPrototype WideForm\"><div class=\"PSection PParameterSection CStyle\"><div class=\"PParameterCells\" data-WideColumnCount=\"4\" data-NarrowColumnCount=\"3\"><div class=\"PBeforeParameters\" data-WideGridArea=\"1/1/5/2\" data-NarrowGridArea=\"1/1/2/4\" style=\"grid-area:1/1/5/2\">slave_axis_stimulus #(</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"1/2/2/3\" data-NarrowGridArea=\"2/1/3/2\" style=\"grid-area:1/2/2/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"1/3/2/4\" data-NarrowGridArea=\"2/2/3/3\" style=\"grid-area:1/3/2/4\">BUS_WIDTH(BUS_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"2/2/3/3\" data-NarrowGridArea=\"3/1/4/2\" style=\"grid-area:2/2/3/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"2/3/3/4\" data-NarrowGridArea=\"3/2/4/3\" style=\"grid-area:2/3/3/4\">USER_WIDTH(USER_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"3/2/4/3\" data-NarrowGridArea=\"4/1/5/2\" style=\"grid-area:3/2/4/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"3/3/4/4\" data-NarrowGridArea=\"4/2/5/3\" style=\"grid-area:3/3/4/4\">DEST_WIDTH(DEST_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"4/2/5/3\" data-NarrowGridArea=\"5/1/6/2\" style=\"grid-area:4/2/5/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"4/3/5/4\" data-NarrowGridArea=\"5/2/6/3\" style=\"grid-area:4/3/5/4\">FILE(<span class=\"SHString\">&quot;in.txt&quot;</span>)</div><div class=\"PAfterParameters NegativeLeftSpaceOnWide\" data-WideGridArea=\"4/4/5/5\" data-NarrowGridArea=\"6/1/7/4\" style=\"grid-area:4/4/5/5\">) slave_axis_stim ( .m_axis_aclk(tb_dut_clk), .m_axis_arstn(tb_dut_rstn), .m_axis_tvalid(tb_stim_valid), .m_axis_tready(tb_stim_ready), .m_axis_tdata(tb_stim_data), .m_axis_tkeep(tb_stim_keep), .m_axis_tlast(tb_stim_last), .m_axis_tuser(tb_stim_user), .m_axis_tdest(tb_stim_dest), .eof(tb_eof) )</div></div></div></div><div class=\"TTSummary\">Device under test SLAVE stimulus module.</div></div>",50:"<div class=\"NDToolTip TModule LSystemVerilog\"><div id=\"NDPrototype50\" class=\"NDPrototype WideForm\"><div class=\"PSection PParameterSection CStyle\"><div class=\"PParameterCells\" data-WideColumnCount=\"4\" data-NarrowColumnCount=\"3\"><div class=\"PBeforeParameters\" data-WideGridArea=\"1/1/14/2\" data-NarrowGridArea=\"1/1/2/4\" style=\"grid-area:1/1/14/2\">axis_string_to_axis_data #(</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"1/2/2/3\" data-NarrowGridArea=\"2/1/3/2\" style=\"grid-area:1/2/2/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"1/3/2/4\" data-NarrowGridArea=\"2/2/3/3\" style=\"grid-area:1/3/2/4\">DELIMITER(<span class=\"SHString\">&quot;;&quot;</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"2/2/3/3\" data-NarrowGridArea=\"3/1/4/2\" style=\"grid-area:2/2/3/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"2/3/3/4\" data-NarrowGridArea=\"3/2/4/3\" style=\"grid-area:2/3/3/4\">TERMINATION(<span class=\"SHString\">&quot;\\n&quot;</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"3/2/4/3\" data-NarrowGridArea=\"4/1/5/2\" style=\"grid-area:3/2/4/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"3/3/4/4\" data-NarrowGridArea=\"4/2/5/3\" style=\"grid-area:3/3/4/4\">STRING_LEN(<span class=\"SHNumber\">4</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"4/2/5/3\" data-NarrowGridArea=\"5/1/6/2\" style=\"grid-area:4/2/5/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"4/3/5/4\" data-NarrowGridArea=\"5/2/6/3\" style=\"grid-area:4/3/5/4\">MBUS_WIDTH(BUS_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"5/2/6/3\" data-NarrowGridArea=\"6/1/7/2\" style=\"grid-area:5/2/6/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"5/3/6/4\" data-NarrowGridArea=\"6/2/7/3\" style=\"grid-area:5/3/6/4\">USER_WIDTH(USER_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"6/2/7/3\" data-NarrowGridArea=\"7/1/8/2\" style=\"grid-area:6/2/7/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"6/3/7/4\" data-NarrowGridArea=\"7/2/8/3\" style=\"grid-area:6/3/7/4\">DEST_WIDTH(DEST_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"7/2/8/3\" data-NarrowGridArea=\"8/1/9/2\" style=\"grid-area:7/2/8/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"7/3/8/4\" data-NarrowGridArea=\"8/2/9/3\" style=\"grid-area:7/3/8/4\">PREFIX_LEN(<span class=\"SHNumber\">1</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"8/2/9/3\" data-NarrowGridArea=\"9/1/10/2\" style=\"grid-area:8/2/9/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"8/3/9/4\" data-NarrowGridArea=\"9/2/10/3\" style=\"grid-area:8/3/9/4\">DATA_PREFIX(<span class=\"SHString\">&quot;#&quot;</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"9/2/10/3\" data-NarrowGridArea=\"10/1/11/2\" style=\"grid-area:9/2/10/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"9/3/10/4\" data-NarrowGridArea=\"10/2/11/3\" style=\"grid-area:9/3/10/4\">DEST_PREFIX(<span class=\"SHString\">&quot;&amp;&quot;</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"10/2/11/3\" data-NarrowGridArea=\"11/1/12/2\" style=\"grid-area:10/2/11/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"10/3/11/4\" data-NarrowGridArea=\"11/2/12/3\" style=\"grid-area:10/3/11/4\">USER_PREFIX(<span class=\"SHString\">&quot;*&quot;</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"11/2/12/3\" data-NarrowGridArea=\"12/1/13/2\" style=\"grid-area:11/2/12/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"11/3/12/4\" data-NarrowGridArea=\"12/2/13/3\" style=\"grid-area:11/3/12/4\">KEYWORD_LEN(<span class=\"SHNumber\">3</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"12/2/13/3\" data-NarrowGridArea=\"13/1/14/2\" style=\"grid-area:12/2/13/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"12/3/13/4\" data-NarrowGridArea=\"13/2/14/3\" style=\"grid-area:12/3/13/4\">SET_KEYWORD(<span class=\"SHString\">&quot;set&quot;</span>),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"13/2/14/3\" data-NarrowGridArea=\"14/1/15/2\" style=\"grid-area:13/2/14/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"13/3/14/4\" data-NarrowGridArea=\"14/2/15/3\" style=\"grid-area:13/3/14/4\">CLR_KEYWORD(<span class=\"SHString\">&quot;clr&quot;</span>)</div><div class=\"PAfterParameters NegativeLeftSpaceOnWide\" data-WideGridArea=\"13/4/14/5\" data-NarrowGridArea=\"15/1/16/4\" style=\"grid-area:13/4/14/5\">) dut ( .aclk(tb_dut_clk), .arstn(tb_dut_rstn), .m_axis_tdata(tb_dut_data), .m_axis_tvalid(tb_dut_valid), .m_axis_tuser(tb_dut_user), .m_axis_tdest(tb_dut_dest), .m_axis_tready(tb_dut_ready), .s_axis_tdata(tb_stim_data), .s_axis_tvalid(tb_stim_valid), .s_axis_tready(tb_stim_ready) )</div></div></div></div><div class=\"TTSummary\">Device under test, axis_string_to_axis_data</div></div>",51:"<div class=\"NDToolTip TModule LSystemVerilog\"><div id=\"NDPrototype51\" class=\"NDPrototype WideForm\"><div class=\"PSection PParameterSection CStyle\"><div class=\"PParameterCells\" data-WideColumnCount=\"4\" data-NarrowColumnCount=\"3\"><div class=\"PBeforeParameters\" data-WideGridArea=\"1/1/5/2\" data-NarrowGridArea=\"1/1/2/4\" style=\"grid-area:1/1/5/2\">master_axis_stimulus #(</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"1/2/2/3\" data-NarrowGridArea=\"2/1/3/2\" style=\"grid-area:1/2/2/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"1/3/2/4\" data-NarrowGridArea=\"2/2/3/3\" style=\"grid-area:1/3/2/4\">BUS_WIDTH(BUS_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"2/2/3/3\" data-NarrowGridArea=\"3/1/4/2\" style=\"grid-area:2/2/3/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"2/3/3/4\" data-NarrowGridArea=\"3/2/4/3\" style=\"grid-area:2/3/3/4\">USER_WIDTH(USER_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"3/2/4/3\" data-NarrowGridArea=\"4/1/5/2\" style=\"grid-area:3/2/4/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"3/3/4/4\" data-NarrowGridArea=\"4/2/5/3\" style=\"grid-area:3/3/4/4\">DEST_WIDTH(DEST_WIDTH),</div><div class=\"PSymbols InFirstParameterColumn\" data-WideGridArea=\"4/2/5/3\" data-NarrowGridArea=\"5/1/6/2\" style=\"grid-area:4/2/5/3\">.</div><div class=\"PName InLastParameterColumn\" data-WideGridArea=\"4/3/5/4\" data-NarrowGridArea=\"5/2/6/3\" style=\"grid-area:4/3/5/4\">FILE(<span class=\"SHString\">&quot;out.bin&quot;</span>)</div><div class=\"PAfterParameters NegativeLeftSpaceOnWide\" data-WideGridArea=\"4/4/5/5\" data-NarrowGridArea=\"6/1/7/4\" style=\"grid-area:4/4/5/5\">) master_axis_stim ( .s_axis_aclk(tb_dut_clk), .s_axis_arstn(tb_dut_rstn), .s_axis_tvalid(tb_dut_valid), .s_axis_tready(tb_dut_ready), .s_axis_tdata(tb_dut_data), .s_axis_tkeep({BUS_WIDTH{<span class=\"SHNumber\">1\'b1</span>}}), .s_axis_tlast(<span class=\"SHNumber\">1\'b0</span>), .s_axis_tuser(tb_dut_user), .s_axis_tdest(tb_dut_dest), .eof(~tb_dut_valid &amp; tb_eof) )</div></div></div></div><div class=\"TTSummary\">Devie under test MASTER stimulus module.</div></div>"});