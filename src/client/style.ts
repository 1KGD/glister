import * as Arwes from '@arwes/react';

export const theme = {
    space: Arwes.createThemeUnit((index) => `${index * 0.25}rem`),
    spacen: Arwes.createThemeMultiplier((index) => index * 4),
    colors: {
        background: 'hsla(90, 100%, 3%)',
        primary: Arwes.createThemeColor((i) => [90, 100, 100 - i * 10]),
        secondary: Arwes.createThemeColor((i) => [60, 100, 100 - i * 10])
    }
};

export default {
    "--bg-color": theme.colors.background,

    "--primary-color-1": theme.colors.primary(1),
    "--primary-color-2": theme.colors.primary(2),
    "--primary-color-3": theme.colors.primary(3),
    "--primary-color-4": theme.colors.primary(4),
    "--primary-color-5": theme.colors.primary(5),

    "--primary-color-1-transparent": theme.colors.primary(1, {alpha: 0.05}),
    "--primary-color-2-transparent": theme.colors.primary(2, {alpha: 0.05}),
    "--primary-color-3-transparent": theme.colors.primary(3, {alpha: 0.05}),
    "--primary-color-4-transparent": theme.colors.primary(4, {alpha: 0.05}),
    "--primary-color-5-transparent": theme.colors.primary(5, {alpha: 0.05}),

    "--secondary-color-1": theme.colors.secondary(1),
    "--secondary-color-2": theme.colors.secondary(2),
    "--secondary-color-3": theme.colors.secondary(3),
    "--secondary-color-4": theme.colors.secondary(4),
    "--secondary-color-5": theme.colors.secondary(5),

    "--secondary-color-1-transparent": theme.colors.secondary(1, {alpha: 0.05}),
    "--secondary-color-2-transparent": theme.colors.secondary(2, {alpha: 0.05}),
    "--secondary-color-3-transparent": theme.colors.secondary(3, {alpha: 0.05}),
    "--secondary-color-4-transparent": theme.colors.secondary(4, {alpha: 0.05}),
    "--secondary-color-5-transparent": theme.colors.secondary(5, {alpha: 0.05}),
};