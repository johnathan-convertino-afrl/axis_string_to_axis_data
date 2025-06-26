# AXIS STRING TO AXIS DATA
### Converts incoming axis string into axis data.
---

![image](docs/manual/img/AFRL.png)

---

  author: Jay Convertino   
  
  date: 2023.01.01  
  
  details: Converts incoming axis string into axis data..  
  
  license: MIT   
   
  Actions:  

  [![Lint Status](../../actions/workflows/lint.yml/badge.svg)](../../actions)  
  [![Manual Status](../../actions/workflows/manual.yml/badge.svg)](../../actions)  
  
---

### Version
#### Current
  - V1.0.0 - initial release

#### Previous
  - none

### DOCUMENTATION
  For detailed usage information, please navigate to one of the following sources. They are the same, just in a different format.

  - [axis_string_to_axis_data.pdf](docs/manual/axis_string_to_axis_data.pdf)
  - [github page](https://johnathan-convertino-afrl.github.io/axis_string_to_axis_data/)

### PARAMETERS

* DELIMITER   : DEFAULT : ";"   : break value between multple strings  
* STRING_LEN  : DEFAULT : 4     : max lenth of string including delimiter  
* TERMINATION : DEFAULT : "\n"  : termination value of full string from serial port, byte only. (\n DEFAULT : 0A \r DEFAULT : 0D).  
* SBUS_WIDTH  : DEFAULT : 1     : bus width of master (data) output  
* USER_WIDTH  : DEFAULT : 4     : user width of master bus, only in 4 bit nibbles and at least 4 bits.  
* DEST_WIDTH  : DEFAULT : 4     : dest width of master bus, only in 4 bit nibbles and at least 4 bits.  
* PREFIX_LEN  : DEFAULT : 1     : length of following prefix strings.  
* DATA_PREFIX : DEFAULT : "#"   : prefix for data hex strings  
* DEST_PREFIX : DEFAULT : "&"   : prefix for destination hex strings  
* USER_PREFIX : DEFAULT : "*"   : prefix for user hex strings  
* KEYWORD_LEN : DEFAULT :  3    : length of the following keywords  
* SET_KEYWORD : DEFAULT : "set" : keyword to output data over tdata,tuser,tdest on master interface.  
* CLR_KEYWORD : DEFAULT : "clr" : keyword to clear output data and buffers of master interface.  

### COMPONENTS
#### SRC

* axis_string_to_axis_data.v
  
#### TB

* tb_axis.v
* in.txt
* tb_cocotb
  
### FUSESOC

* fusesoc_info.core created.
* Simulation uses icarus to run data through the core.

#### Targets

* RUN WITH: (fusesoc run --target=sim VENDER:CORE:NAME:VERSION)
  - default (for IP integration builds)
  - lint
  - sim
  - sim_cocotb
