const MINE_TIME = 1000 // in ms
const INIT_DUFFICULTY = 2;
const GENESIS_DATA = {
    timeStamp : "1/1/2000",
    prvHash : "0x000",
    hash : "0x123",
    nounce : 0,
    difficulty : INIT_DUFFICULTY,
    data : []
}
module.exports = {GENESIS_DATA , MINE_TIME};