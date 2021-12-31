import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  type = 'default';
  imageName = 'gift.png';

  scratchData = {
    scratchType: SCRATCH_TYPE.LINE,
    containerWidth: 300, //scContainer.offsetWidth,
    containerHeight: 300,
    imageForwardSrc: '../assets/scratch.png',
    // imageBackgroundSrc: '../assets/download.jpeg',
    htmlBackground:
      '<div class="cardamountcss"><div class="won-amnt">Try</div><div class="won-text">Again<br></div></div>',

    clearZoneRadius: 30,
    nPoints: 30,
    pointSize: 4,
    callback: () => {
      console.log('Now the window will reload !');
    },
  };

  queryParam: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // sample route - > http://localhost:4200/?scratchCode=nani
      console.log(params);
      this.queryParam = params;
      console.log();
      if (this.queryParam.scratchCode) {
        this.setScratchMessage(this.queryParam.scratchCode);
      }
    });
    setTimeout(() => {
      this.createNewScratchCard();
    }, 50);
  }

  createNewScratchCard() {
    console.log(this.scratchData);
    const scContainer = document.getElementById('js--sc--container');
    const sc = new ScratchCard('#js--sc--container', this.scratchData);
    // Init
    sc.init()
      .then(() => {
        sc.htmlBackground = sc.canvas.addEventListener('scratch.move', () => {
          let percent = sc.getPercent().toFixed(2);
          console.log(percent);
          if (!this.queryParam.scratchCode && percent > 30) {
            this.type = 'tryAgain';
            this.imageName = 'bad.ico';
          } else if (this.queryParam.scratchCode && percent > 30) {
            if (this.type == 'win') {
              this.imageName = 'baby.jpeg';
            }
            if (this.type != 'win') {
              this.imageName = 'bad.ico';
            }
          }
        });
      })
      .catch((error: any) => {
        // image not loaded
        alert(error.message);
      });
  }

  setScratchMessage(param: any) {
    console.log(param);
    switch (param) {
      case '20ARAS1301': {
        this.scratchData.htmlBackground =
          '<div class="cardamountcss"><div class="won-amnt">Try</div><div class="won-text">Again<br></div></div>';
        this.type = 'tryAgain';
        break;
      }
      case '20ARAS1302': {
        this.scratchData.htmlBackground =
          '<div class="cardamountcss"><div class="won-amnt">राधे राधे ||</div><div class="won-text">आप नाना नानी <br>बनने वाले हैं  </div></div>';
        this.type = 'win';
        break;
      }
      case '20ARAS1303': {
        this.scratchData.htmlBackground =
          '<div class="cardamountcss"><div class="won-amnt">Hello to my</div><div class="won-text">Inna-national<br>मामू  </div></div>';
        this.type = 'win';
        break;
      }
      case '20ARAS1304': {
        this.scratchData.htmlBackground =
          '<div class="cardamountcss"><div class="won-amnt">Hi Chachu</div><div class="won-text">HALA MADRID !!<br></div></div>';

        this.type = 'win';
        break;
      }
      case '20ARAS1305': {
        this.scratchData.htmlBackground =
          '<div class="cardamountcss"><div class="won-amnt">बधाई हो ||</div><div class="won-text">आप दादा दादी  <br>बनने वाले हैं  </div></div>';
        this.type = 'win';
        break;
      }
    }
  }
}
