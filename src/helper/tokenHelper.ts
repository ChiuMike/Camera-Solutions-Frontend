let idleTime = 0;
let idleInterval: ReturnType<typeof setInterval> | undefined;

export const setIdleTime = (time: number) => {
    idleTime = time;
};

export const startTimer = (callback: () => void) => {
    const hasToken = localStorage.getItem("token");
    const expired = localStorage.getItem("expires_at");

    if (
        hasToken!== null &&
        (idleInterval === undefined || idleInterval === null) &&
        expired !== null
    ) {
        idleInterval = setInterval(async () => {
            idleTime += 1;
            if (idleTime >= 58 || Number(expired) <= Date.now()) {
                // 60分鐘閒置登出系統
                await callback();
                idleTime = 0;
                localStorage.clear();
            }
        }, 60000);
    } else if (
        hasToken === null &&
        idleInterval !== undefined &&
        idleInterval !== null
    ) {
        stopTimer();
    }
};

export const stopTimer = () => {
    idleTime = 0;
    if (idleInterval) {
        clearInterval(idleInterval);
    }
    idleInterval = undefined;
};
