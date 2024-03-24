import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {

    const totalEro = games.reduce((total, game) => {
        let minRed = 0, minGreen = 0, minBlue = 0;

        game.draws.forEach(draw => {
            minRed = Math.max(minRed, draw.red ?? minRed);
            minGreen = Math.max(minGreen, draw.green ?? minGreen);
            minBlue = Math.max(minBlue, draw.blue ?? minBlue);

        });

        return total + (minRed ?? 0) * (minGreen ?? 0) * (minBlue ?? 0);
    }, 0);
    
    return totalEro;
};
