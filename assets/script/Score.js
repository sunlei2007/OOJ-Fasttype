'use strict';
class Score {
    #date
    #hits
    #percentage

    constructor(date = new Date().toLocaleDateString(), hits=0, percentage=0) {
        this.date = date;
        this.hits = hits;
        this.percentage = percentage;
     }
    set date(date) {
        this.#date = date;
     }
    get date() {
        return this.#date;
     }
    set hits(hits) {
        this.#hits = hits;
         
     }
    get hits() {
        return this.#hits;
     }
    set percentage(percentage) {
        this.#percentage = percentage;            
     }
    get percentage() {
        return this.#percentage;
     }
 
}
export {  Score }