import React, { useState, useEffect, useMemo, useRef } from 'react';

type useBaseCounterProps = {
  /** 倒计时时间 */
  time: number | string;
  /** 是否为毫秒 -- 默认为 false */
  isMilliSecond?: boolean;
};

/** 基础倒计时hook */
export const useBaseCounter = (props: useBaseCounterProps) => {
  const { time, isMilliSecond = false } = props;

  const [resTime, setResTime] = useState({
    dd: 0,
    hh: 0,
    mm: 0,
    ss: 0
  });

  /** 有些浏览器切到后台，定时器会冷却 */
  const curTime = useRef(Date.now());

  const timer = useRef<NodeJS.Timeout | null>(null);
  const duration = useMemo(() => (isMilliSecond ? Math.floor(+time / 1000) : Math.floor(+time)), [isMilliSecond]);

  useEffect(() => {
    countTime();
  }, []);

  /** 开始倒计时 */
  const countTime = () => {
    getTime(duration);
  };

  /** 获取时间 */
  const getTime = (time: number) => {
    timer.current && clearTimeout(timer.current);
    if (time < 0) {
      return;
    }

    const { dd = 0, hh = 0, mm = 0, ss } = durationFormatter(time);
    setResTime({ dd, hh, mm, ss });

    timer.current = setTimeout(() => {
      const nowTime = Date.now();
      const diffTime = Math.floor((nowTime - curTime.current) / 1000);

      curTime.current = nowTime;

      const step = diffTime > 1 ? diffTime : 1;

      getTime(time - step);
    }, 1000);
  };

  return resTime;
};

/**
 * 处理时间格式
 * @param time
 */
function durationFormatter(time: number) {
  if (!time) return { ss: 0 };

  let t = time;
  const ss = t % 60;
  t = (t - ss) / 60;

  if (t < 1) return { ss };
  const mm = t % 60;
  t = (t - mm) / 60;

  if (t < 1) return { mm, ss };
  const hh = t % 24;
  t = (t - hh) / 24;

  if (t < 1) return { hh, mm, ss };
  const dd = t;
  return { dd, hh, mm, ss };
}
