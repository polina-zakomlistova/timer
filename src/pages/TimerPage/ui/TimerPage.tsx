import React, { FC } from 'react';
import { Timer } from 'entities/Timer';
import cls from './TimerPage.module.scss';

export const TimerPage: FC = () => (
    <section>
        <h2 className={cls.title}>Таймер</h2>
        <Timer />
    </section>
);
