import { makeAutoObservable } from 'mobx';
import RootStore from 'app/providers/store/config/store';
import { ITimer } from 'entities/Timer/model/types/timer';

export interface IProfileStore {
    rootStore: RootStore;
}

export default class Timer implements IProfileStore {
    rootStore: RootStore;

    initData: ITimer = {
        endTimer: 0,
    };

    hours: number = 0;

    minutes: number = 0;

    seconds: number = 0;

    isActive: boolean = false;

    finished: boolean = false;

    data: ITimer = this.initData;

    stop = () => {
        this.isActive = false;
        this.finished = false;
    };

    start = (hours: number, mins: number, secs: number) => {
        const ms = (hours * 3600 + mins * 60 + secs) * 1000;
        const endTimer = (new Date().getTime() + ms);
        this.data.endTimer = endTimer;
        this.isActive = true;
        this.finished = false;
    };

    updateHours = () => {
        const diffMS = this.data.endTimer - new Date().getTime();
        this.hours = Math.floor(diffMS / (1000 * 60 * 60));
    };

    updateMinutes = () => {
        const diffMS = this.data.endTimer - new Date().getTime();
        this.minutes = Math.floor((diffMS % (1000 * 60 * 60)) / (1000 * 60));
    };

    updateSeconds = () => {
        const diffMS = this.data.endTimer - new Date().getTime();
        this.seconds = Math.floor((diffMS % (1000 * 60)) / 1000);
    };

    get isFinished() {
        const diffMS = this.data.endTimer - new Date().getTime();
        return diffMS <= 0;
    }

    updateTimer = () => {
        if (this.isFinished) {
            this.isActive = false;
            this.finished = true;
        } else {
            this.updateSeconds();
            this.updateMinutes();
            this.updateHours();
        }
    };

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
