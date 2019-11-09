

class Legend {

  constructor(){
    this.struct = {};
    this.count = 0;
  }
  
  key_value_swap(dict){
    var new_dict = JSON.parse(dict);
    var that = this;
  
    Object.keys(new_dict).forEach(function(key) {
      that.struct[new_dict[key]] = key;
    });  
  }
}

module.exports = Legend
