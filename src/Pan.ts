import Mouse from './tools/Mouse'
import { EventEmitter } from './EventEmitter'

export {
    EventEmitter,
    Mouse
}

abstract class DoSomething {
    abstract rightNow(): void

    meowmeow(): void {
        this.rightNow()
    }
}

// class somethingDoer extends DoSomething {
//     rightNow () {
//         console.log('doing something right now');
//     }
//     meow() {
//         this.meowmeow()
//     }
//
// }
//
// const sd = new somethingDoer()
// sd.meow()
