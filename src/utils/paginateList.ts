const paginateList = <T>(list:T[], pageSize:number, pageNumber:number) : T[]  => {
    return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export default paginateList;