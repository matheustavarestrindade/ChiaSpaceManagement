import si from "systeminformation";
import { PLOTS_GiB_SIZES } from "./PlotSizes.js";
async function test() {
    const data2 = await si.diskLayout();
    for (const disk of data2) {
        const diskSizeGiB = disk.size / 1.074e9;
        let bestBet = [];
        let bestSpace = 0;
        let tryes = 0;
        while (tryes < 100000) {
            tryes++;
            let usedSpace = 0;
            let keys = Object.keys(PLOTS_GiB_SIZES);
            let bet = [];
            while (usedSpace < diskSizeGiB) {
                let selectedKey = keys[Math.floor(Math.random() * keys.length)];
                let selectedSize = PLOTS_GiB_SIZES[selectedKey];
                if (usedSpace + selectedSize > diskSizeGiB) break;
                bet.push(selectedKey);
                usedSpace += selectedSize;
            }
            if (bestSpace < usedSpace) {
                bestSpace = usedSpace;
                bestBet = bet;
            }
        }
        console.log("Disk: " + disk.name + " - " + disk.type);
        console.log("Best found configuration: " + bestBet);
        const bestSpacePercentage = Number((bestSpace / diskSizeGiB) * 100).toFixed(2) + "%";
        const bestSpaceRemainPercentage = Number(((diskSizeGiB - bestSpace) / diskSizeGiB) * 100).toFixed(2) + "%";
        console.log("Space Used: " + Number(bestSpace).toFixed(2) + "  " + bestSpacePercentage);
        console.log("Space remaining: " + Number(diskSizeGiB - bestSpace).toFixed(2) + " " + bestSpaceRemainPercentage);
        console.log("\n\n");
    }
}
test();
