# Angular 4 AB testing

Easily AB test your Angular 4 application

## Installation

```bash
$ npm install angular-ab
```

## Basic usage

```js
import { AngularAB } from 'angular-ab';

@NgModule({
  declarations: [
    AngularAB
  ],
  providers: [
    {
      provide: 'AB_CONF',
      useValue: [
        { 'A': 50, 'B': 50 }
      ]
    }
  ]
})
```

```html
<button *abTest="'A'" type="submit" class="ui button blue">Submit</button>
<button *abTest="'B'" type="submit" class="ui button red">Submit</button>
```

It will display the version A or B randomly, based on the percentage of chance configured into AB_CONF.

You can manage more complex test, even multiple tests at the same time :

```js
{
  provide: 'AB_CONF',
  useValue: [
    { 'A': 50, 'B': 30, 'C': 20 }, // The total of each version must be 100
    { 'Foo': 70, 'Bar': 30 } // You can name your versions as you want
  ]
}
```

Each test will generate a random number, this number is stored in the LocalStorage and used for 24 hours so if the user hit the refresh button, he won't see another version.

If you made changes on AB_CONF, it will invalid the stored random numbers and generate new.

If you have any issue or want to request a feature, send me an email: eddy at bordi dot fr.