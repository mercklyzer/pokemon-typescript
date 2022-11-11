const leftPad = (value:number|string, padding:number):string => {
    const zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

export default leftPad;