﻿NDSummary.OnToolTipsLoaded("SystemVerilogModule:axis_string_to_axis_data",{52:"<div class=\"NDToolTip TModule LSystemVerilog\"><div id=\"NDPrototype52\" class=\"NDPrototype WideForm\"><div class=\"PSection PParameterSection CStyle\"><div class=\"PParameterCells\" data-WideColumnCount=\"6\" data-NarrowColumnCount=\"5\"><div class=\"PBeforeParameters\" data-WideGridArea=\"1/1/14/2\" data-NarrowGridArea=\"1/1/2/6\" style=\"grid-area:1/1/14/2\"><span class=\"SHKeyword\">module</span> axis_string_to_axis_data #(</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"1/2/2/3\" data-NarrowGridArea=\"2/1/3/2\" style=\"grid-area:1/2/2/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"1/3/2/4\" data-NarrowGridArea=\"2/2/3/3\" style=\"grid-area:1/3/2/4\">DELIMITER</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"1/4/2/5\" data-NarrowGridArea=\"2/3/3/4\" style=\"grid-area:1/4/2/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"1/5/2/6\" data-NarrowGridArea=\"2/4/3/5\" style=\"grid-area:1/5/2/6\"><span class=\"SHString\">&quot;;&quot;</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"2/2/3/3\" data-NarrowGridArea=\"3/1/4/2\" style=\"grid-area:2/2/3/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"2/3/3/4\" data-NarrowGridArea=\"3/2/4/3\" style=\"grid-area:2/3/3/4\">TERMINATION</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"2/4/3/5\" data-NarrowGridArea=\"3/3/4/4\" style=\"grid-area:2/4/3/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"2/5/3/6\" data-NarrowGridArea=\"3/4/4/5\" style=\"grid-area:2/5/3/6\"><span class=\"SHString\">&quot;\\n&quot;</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"3/2/4/3\" data-NarrowGridArea=\"4/1/5/2\" style=\"grid-area:3/2/4/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"3/3/4/4\" data-NarrowGridArea=\"4/2/5/3\" style=\"grid-area:3/3/4/4\">STRING_LEN</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"3/4/4/5\" data-NarrowGridArea=\"4/3/5/4\" style=\"grid-area:3/4/4/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"3/5/4/6\" data-NarrowGridArea=\"4/4/5/5\" style=\"grid-area:3/5/4/6\"><span class=\"SHNumber\">4</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"4/2/5/3\" data-NarrowGridArea=\"5/1/6/2\" style=\"grid-area:4/2/5/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"4/3/5/4\" data-NarrowGridArea=\"5/2/6/3\" style=\"grid-area:4/3/5/4\">MBUS_WIDTH</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"4/4/5/5\" data-NarrowGridArea=\"5/3/6/4\" style=\"grid-area:4/4/5/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"4/5/5/6\" data-NarrowGridArea=\"5/4/6/5\" style=\"grid-area:4/5/5/6\"><span class=\"SHNumber\">1</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"5/2/6/3\" data-NarrowGridArea=\"6/1/7/2\" style=\"grid-area:5/2/6/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"5/3/6/4\" data-NarrowGridArea=\"6/2/7/3\" style=\"grid-area:5/3/6/4\">USER_WIDTH</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"5/4/6/5\" data-NarrowGridArea=\"6/3/7/4\" style=\"grid-area:5/4/6/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"5/5/6/6\" data-NarrowGridArea=\"6/4/7/5\" style=\"grid-area:5/5/6/6\"><span class=\"SHNumber\">4</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"6/2/7/3\" data-NarrowGridArea=\"7/1/8/2\" style=\"grid-area:6/2/7/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"6/3/7/4\" data-NarrowGridArea=\"7/2/8/3\" style=\"grid-area:6/3/7/4\">DEST_WIDTH</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"6/4/7/5\" data-NarrowGridArea=\"7/3/8/4\" style=\"grid-area:6/4/7/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"6/5/7/6\" data-NarrowGridArea=\"7/4/8/5\" style=\"grid-area:6/5/7/6\"><span class=\"SHNumber\">4</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"7/2/8/3\" data-NarrowGridArea=\"8/1/9/2\" style=\"grid-area:7/2/8/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"7/3/8/4\" data-NarrowGridArea=\"8/2/9/3\" style=\"grid-area:7/3/8/4\">PREFIX_LEN</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"7/4/8/5\" data-NarrowGridArea=\"8/3/9/4\" style=\"grid-area:7/4/8/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"7/5/8/6\" data-NarrowGridArea=\"8/4/9/5\" style=\"grid-area:7/5/8/6\"><span class=\"SHNumber\">1</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"8/2/9/3\" data-NarrowGridArea=\"9/1/10/2\" style=\"grid-area:8/2/9/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"8/3/9/4\" data-NarrowGridArea=\"9/2/10/3\" style=\"grid-area:8/3/9/4\">DATA_PREFIX</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"8/4/9/5\" data-NarrowGridArea=\"9/3/10/4\" style=\"grid-area:8/4/9/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"8/5/9/6\" data-NarrowGridArea=\"9/4/10/5\" style=\"grid-area:8/5/9/6\"><span class=\"SHString\">&quot;#&quot;</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"9/2/10/3\" data-NarrowGridArea=\"10/1/11/2\" style=\"grid-area:9/2/10/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"9/3/10/4\" data-NarrowGridArea=\"10/2/11/3\" style=\"grid-area:9/3/10/4\">DEST_PREFIX</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"9/4/10/5\" data-NarrowGridArea=\"10/3/11/4\" style=\"grid-area:9/4/10/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"9/5/10/6\" data-NarrowGridArea=\"10/4/11/5\" style=\"grid-area:9/5/10/6\"><span class=\"SHString\">&quot;&amp;&quot;</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"10/2/11/3\" data-NarrowGridArea=\"11/1/12/2\" style=\"grid-area:10/2/11/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"10/3/11/4\" data-NarrowGridArea=\"11/2/12/3\" style=\"grid-area:10/3/11/4\">USER_PREFIX</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"10/4/11/5\" data-NarrowGridArea=\"11/3/12/4\" style=\"grid-area:10/4/11/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"10/5/11/6\" data-NarrowGridArea=\"11/4/12/5\" style=\"grid-area:10/5/11/6\"><span class=\"SHString\">&quot;*&quot;</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"11/2/12/3\" data-NarrowGridArea=\"12/1/13/2\" style=\"grid-area:11/2/12/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"11/3/12/4\" data-NarrowGridArea=\"12/2/13/3\" style=\"grid-area:11/3/12/4\">KEYWORD_LEN</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"11/4/12/5\" data-NarrowGridArea=\"12/3/13/4\" style=\"grid-area:11/4/12/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"11/5/12/6\" data-NarrowGridArea=\"12/4/13/5\" style=\"grid-area:11/5/12/6\"><span class=\"SHNumber\">3</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"12/2/13/3\" data-NarrowGridArea=\"13/1/14/2\" style=\"grid-area:12/2/13/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"12/3/13/4\" data-NarrowGridArea=\"13/2/14/3\" style=\"grid-area:12/3/13/4\">SET_KEYWORD</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"12/4/13/5\" data-NarrowGridArea=\"13/3/14/4\" style=\"grid-area:12/4/13/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"12/5/13/6\" data-NarrowGridArea=\"13/4/14/5\" style=\"grid-area:12/5/13/6\"><span class=\"SHString\">&quot;set&quot;</span>,</div><div class=\"PType InFirstParameterColumn\" data-WideGridArea=\"13/2/14/3\" data-NarrowGridArea=\"14/1/15/2\" style=\"grid-area:13/2/14/3\"><span class=\"SHKeyword\">parameter</span>&nbsp;</div><div class=\"PName\" data-WideGridArea=\"13/3/14/4\" data-NarrowGridArea=\"14/2/15/3\" style=\"grid-area:13/3/14/4\">CLR_KEYWORD</div><div class=\"PDefaultValueSeparator\" data-WideGridArea=\"13/4/14/5\" data-NarrowGridArea=\"14/3/15/4\" style=\"grid-area:13/4/14/5\">&nbsp=&nbsp;</div><div class=\"PDefaultValue InLastParameterColumn\" data-WideGridArea=\"13/5/14/6\" data-NarrowGridArea=\"14/4/15/5\" style=\"grid-area:13/5/14/6\"><span class=\"SHString\">&quot;clr&quot;</span></div><div class=\"PAfterParameters NegativeLeftSpaceOnWide\" data-WideGridArea=\"13/6/14/7\" data-NarrowGridArea=\"15/1/16/6\" style=\"grid-area:13/6/14/7\">) ( <span class=\"SHKeyword\">input</span> aclk, <span class=\"SHKeyword\">input</span> arstn, <span class=\"SHKeyword\">output</span> [(MBUS_WIDTH*<span class=\"SHNumber\">8</span>)<span class=\"SHNumber\">-1</span>:<span class=\"SHNumber\">0</span>] m_axis_tdata, <span class=\"SHKeyword\">output</span> m_axis_tvalid, <span class=\"SHKeyword\">output</span> [USER_WIDTH-<span class=\"SHNumber\">1</span>:<span class=\"SHNumber\">0</span>] m_axis_tuser, <span class=\"SHKeyword\">output</span> [DEST_WIDTH-<span class=\"SHNumber\">1</span>:<span class=\"SHNumber\">0</span>] m_axis_tdest, <span class=\"SHKeyword\">input</span> m_axis_tready, <span class=\"SHKeyword\">input</span> [<span class=\"SHNumber\">7</span>:<span class=\"SHNumber\">0</span>] s_axis_tdata, <span class=\"SHKeyword\">input</span> s_axis_tvalid, <span class=\"SHKeyword\">output</span> s_axis_tready )</div></div></div></div><div class=\"TTSummary\">Convert string data to raw binary data for axis bus.</div></div>"});