import useStore from 'features/hooks/useStore';
import {observer} from 'mobx-react-lite';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';
import {Input} from 'shared/ui/Input/Input';
import {ChangeEvent, useCallback, useEffect, useRef, useState,} from 'react';
import {pad} from 'shared/lib/workWithString/workWithString';
import {getMin, getMinMax} from 'shared/lib/workWirhNumber/workWithNumber';
import cls from './Timer.module.scss';

interface TimerProps {
    className?: string;
}

export const Timer = observer((props: TimerProps) => {
    const [timerStore] = useStore('timer');

    const {
        hours,
        minutes,
        seconds,
        stop,
        start,
        updateTimer,
        isActive,
        finished,
    } = timerStore;

    const [hoursState, setHours] = useState('0');
    const [minutesState, setMinutes] = useState('0');
    const [secondState, setSecond] = useState('0');

    const intervalRef = useRef<NodeJS.Timer|undefined>(undefined);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                updateTimer();
            }, 300);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isActive, updateTimer]);

    const handleStart = useCallback(() => {
        start(Number(hoursState), Number(minutesState), Number(secondState));
    },[start,hoursState,minutesState,secondState]) ;

    const handleStop = useCallback(()=> {
        stop();
    },[stop]) ;

    if (finished) {
        stop();
        alert('Время истекло!');
    }

    const handleChangeHours = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        // доступные значения от 0 до бесконечности
        const hour = getMin(value, 0).toString();
        setHours(hour);
    }, [setHours]);

    const handleChangeMinutes = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        // доступные значения от 0 до 60
        const minutes = getMinMax(value, 0, 60).toString();
        setMinutes(minutes);
    }, [setMinutes]);

    const handleChangeSeconds = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        // доступные значения от 0 до 60
        const seconds = getMinMax(value, 0, 60).toString();
        setSecond(seconds);
    }, [setSecond]);

    //добавляем лидирующие нули
    const hoursStr = pad(hours.toString(), 2);
    const minsStr = pad(minutes.toString(), 2);
    const secsStr = pad(seconds.toString(), 2);

    const timerTablo = `${hoursStr}:${minsStr}:${secsStr}`;

    return (
        <div className={cls.Wrapper}>
            <div className={cls.tablo}>
                {timerTablo}
            </div>
            <div className={cls.inputWrapper}>
                <Input
                    id="hour"
                    defaultValue={0}
                    value={hoursState}
                    label="часы"
                    onChange={handleChangeHours}
                    type="number"
                    min={0}
                    disabled={isActive}
                />
                <Input
                    id="minutes"
                    defaultValue={0}
                    value={minutesState}
                    label="минуты"
                    onChange={handleChangeMinutes}
                    type="number"
                    min={0}
                    max={60}
                    disabled={isActive}
                />
                <Input
                    id="second"
                    defaultValue={0}
                    value={secondState}
                    label="секунды"
                    onChange={handleChangeSeconds}
                    type="number"
                    min={0}
                    max={60}
                    disabled={isActive}
                />
            </div>
            {
                !isActive ? (
                    <Button onClick={handleStart} theme={ButtonTheme.SUCCESS}>Начать</Button>
                ) : (
                    <Button onClick={handleStop} theme={ButtonTheme.ERROR}>Остановить</Button>
                )
            }
        </div>
    );
});
