const LightProgram = require("./../base-programs/LightProgram");
const ColorUtils = require("./../utils/ColorUtils");

module.exports = class WandMixable extends LightProgram {

  init() {
    this.ledsToPaint = [];
    this.currentColor = [0, 0, 0];
    super.init();
  }

  tap(data){
    if (data.clear){
      this.ledsToPaint = [];
      this.currentColor = [0,0,0]
      return;
    }
    this.ledsToPaint.push({pos: data.position, color: data.color});
  }
  // Override base class
  drawFrame(leds, context) {
    for (let j = 0; j < this.ledsToPaint.length ; j++){
      let ledToPaint = this.ledsToPaint[j]
      leds[ledToPaint.pos] = ledToPaint.color;
    }
  }

  // Override and extend config Schema
  static configSchema() {
    let res = super.configSchema();
    res.brillo = { type: Number, min: 0, max: 1, step: 0.01, default: 1 };
    res.brillo = { type: Number, min: 0, max: 1, step: 0.01, default: 1 };
    return res;
  }
};
