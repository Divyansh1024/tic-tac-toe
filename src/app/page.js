"use client"

import styles from './style.module.css'
import CCImage from '@/components/CCimage';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
    const [_order, setOrder] = useState(3);

    const handeorderchange = (e) => {
        let v = parseInt(e.target.value);
        setOrder(v);
    };

    return (
        <div className={styles.container}>
            <section className={styles.sectionStyle}>
                <h2 className={styles.heading}>Play vs random player</h2>
                <label className={styles.labelStyle} htmlFor="order">
                    <span>Order : </span>
                    <input className={styles.inputSection} type="number" min={3} defaultValue={3} />
                </label>
                <div>
                    <center>
                        <button className={styles.button}>Play</button>
                    </center>
                </div>
            </section>

            <section className={styles.sectionStyle}>
                <h2 className={styles.heading}>Play vs computer</h2>
                <label className={styles.labelStyle} htmlFor="order">
                    <span>Order : </span>
                    <input id='section2' className={styles.inputSection} type="number" min={3} defaultValue={3} onChange={(e) => handeorderchange(e)} />
                </label>
                <div>
                    <Link href={{ pathname: '/computer', query: { _order: _order, _turn: 'cross' } }}>
                        <button className={styles.button}>
                            <CCImage imagename="cross" width={80} />
                        </button>
                    </Link>

                    <Link href={{ pathname: '/computer', query: { _order: _order, _turn: 'circle' } }}>
                        <button className={styles.button}>
                            <CCImage imagename="circle" width={80} />
                        </button>
                    </Link>

                    <center>
                        <Link href={{ pathname: '/computer', query: { _order: _order, _turn: 'cross' } }}>
                            <button className={styles.button}>
                                RANDOM
                            </button>
                        </Link>

                    </center>
                </div>
            </section>

            <section className={styles.sectionStyle}>
                <h2 className={styles.heading}>Play over the board</h2>
                <label className={styles.labelStyle} htmlFor="order">
                    <span>Order : </span>
                    <input className={styles.inputSection} type="number" min={3} defaultValue={3} />
                </label>
                <div>
                    <center>
                        <button className={styles.button}>Play</button>
                    </center>
                </div>
            </section>
        </div>
    );
}