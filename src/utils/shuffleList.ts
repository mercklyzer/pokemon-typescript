const shuffleList = <T>(list:T[]) => {
    return list.sort(() => Math.random() - 0.5);
}

export default shuffleList;