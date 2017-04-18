import { Inject } from '@angular/core';

export class ABTestService {
	abConf: any[];
  testMap: any = {};

  constructor(
    @Inject('AB_CONF') abConf: any[]
  ) {
  	if(!abConf[abConf.length - 1].init || typeof abConf[abConf.length - 1].init !== 'object') {
      abConf.push( { init: {} } );

      if(localStorage.abConf) {
        let o = JSON.parse(localStorage.abConf);
        let time = o.time;

        for (let i = 0; i < abConf.length - 1; ++i) {
          let order = 0;
          for (let elm in abConf[i]) {
            this.testMap[elm] = [i, order];
            order++;
          }
        }

        if(time > (Date.now() - 60*60*24*1000) && JSON.stringify(this.testMap) === JSON.stringify(o.testMap)) {
          this.abConf = o.abConf;
          abConf[abConf.length - 1].init = { abConf: this.abConf, testMap: this.testMap, time: Date.now() };
        }
      }

      if(!this.abConf) {
        this.abConf = [];
        for (let i = 0; i < abConf.length - 1; ++i) {
          this.abConf.push(abConf[i]);
        }

        for (let i = 0; i < abConf.length - 1; ++i) {
          let order = 0;
          for (let elm in this.abConf[i]) {
            this.testMap[elm] = [i, order];
            order++;
          }

          this.abConf[i].rand = Math.random() * 100;
        }

        abConf[abConf.length - 1].init = { abConf: this.abConf, testMap: this.testMap, time: Date.now() };
        localStorage.abConf = JSON.stringify(abConf[abConf.length - 1].init);
      }
	  } else {
	  	this.abConf = abConf[abConf.length - 1].init.abConf;
	  	this.testMap = abConf[abConf.length - 1].init.testMap;
	  }
  }

  checkTest(elm: string): boolean {
  	if(this.testMap[elm]) {
      let testPos = this.testMap[elm][0];
      let elmPos = this.testMap[elm][1];

      let from = 0;
      let rand = this.abConf[testPos].rand;

      let i = 0;
      for (let e in this.abConf[testPos]) {
        i++;
        if(i <= elmPos) from += this.abConf[testPos][e];
        else break;
      }

      let to = from + this.abConf[testPos][elm];

      if(rand > from && rand <= to) return true;
    }

    return false;
  }
}