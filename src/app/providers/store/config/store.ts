import Timer from 'entities/Timer/model/store/timer';

export default class RootStore {
    timer: Timer;

    localStorage: Storage;

    constructor() {
        this.timer = new Timer(this);
        this.localStorage = window.localStorage;
    }
}
