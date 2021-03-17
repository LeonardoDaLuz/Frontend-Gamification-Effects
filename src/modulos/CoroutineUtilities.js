function* test() {
    console.log('Hello!');
    yield* WaitForSeconds(2);
    console.log('Depois de 2 segundos');
    yield* WaitForSeconds(5);
    console.log('Depois de 5 segundos');
}


function* WaitForSeconds(tempo) {
    var expireTime = Date.now() + tempo * 1000;
    yield;
    while (Date.now() < expireTime) {
        yield;
    }
}

export function StartCoroutine(coroutine) {
    var iterator = coroutine();
    iterator.next();
    var refreshIntervalId = setInterval(function () {
        iterator.next();
    }, 16);
}

window.StartCoroutine = StartCoroutine;
window.WaitForSeconds = WaitForSeconds;

class Mathf {

    static lerp(start, end, amt) {
        var value = (1 - amt) * start + amt * end;
        if (Number.isNaN(value)) {
            value = 0;
        }

        if(start<end) {
            if(value<start)
                value=start;
            if(value>end)
                value=end;
        } else {
            if(value>start)
                value=start;
            if(value<end)
                value=end;
        }

        return value;
    }

    static RandomRange(min, max) {
        var diff = max - min;
        return Math.random() * diff + min;
    }

    static clamp(value, min, max) {
        if (value < min) {
            value = min;
        }
        if (value > max) {
            value = max;
        }

        return value
    }
}
window.Mathf = Mathf;

//StartCoroutine(test);