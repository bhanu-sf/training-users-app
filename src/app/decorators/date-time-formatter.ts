import * as moment from 'moment';

export function DateTimeFormatter() {
  return (target: any, key: string | symbol) => {
    let val = target[key];
    const getter = () => moment(val).format('DD-MM-YYYY hh:mm:ss A');
    const setter = (next: string) => {
      val = moment(val).format('DD-MM-YYYY hh:mm:ss A');
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}