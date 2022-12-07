document.addEventListener("DOMContentLoaded", function (event) {
    var form = document.querySelector('#project');
    var cacheMiss;
    var cacheHit;
    var average;
    var total;
    var directMemory = [];
    var binaryMemory = [];
    var cacheBlockSize;
    var missPenalty;

    //console.log("TRY");
    $("#submitBtn").click(function () {
        cacheMiss = 0;
        cacheHit = 0;
        average = 0;
        total = 0;
        missPenalty = 0;
        directMemory = [];
        binaryMemory = []
        
        var cacheSize = document.querySelector('#cacheSize');
        var cacheOption = document.querySelector('#cacheOption');

        if (cacheOption.value == "Words") {
            cacheBlockSize = cacheSize.value / 4;
        } else if (cacheOption.value == "Blocks"){
            cacheBlockSize = cacheSize.value;
        }

        var block = document.querySelector('#block');

        if (block.value == "") {
            block.value = 4;
        }

        var mmSize = document.querySelector('#mmSize');
        var mmOption = document.querySelector('#mmOption');

        var memory = document.querySelector('#memory'); // Sequence

        var cacheAccess = document.querySelector('#cacheTime');
        var memoryTime = document.querySelector('#memoryTime');

        if (cacheAccess.value == "") {
            cacheAccess.value = 1;
        }

        if (memoryTime.value == "") {
            memoryTime.value = 10;
        }

        console.log(cacheBlockSize);
        console.log(cacheOption.value);
        console.log(block.value);
        console.log(mmSize.value);
        console.log(mmOption.value);
        console.log(memory.value);
        console.log(cacheAccess.value);
        console.log(memoryTime.value);

        if (mmSize.value == "" && cacheBlockSize != "" && memory.value != "" && cacheOption.value != "B/W") {
            var mem = memory.value.split(",");
            var memInt = mem.map(Number);
            //console.log(memInt);

            directMemory = directMapping(memInt, cacheBlockSize);
            missPenalty = parseInt(cacheAccess.value) + parseInt(block.value) * parseInt(memoryTime.value) + parseInt(cacheAccess.value);
            average = (cacheHit / memInt.length) + (cacheMiss / memInt.length) * missPenalty;
            total = (parseInt(block.value) * cacheHit * parseInt(cacheAccess.value)) + cacheMiss * parseInt(block.value) * (parseInt(cacheAccess.value) + parseInt(memoryTime.value)) + (cacheMiss * parseInt(cacheAccess.value)) ;
            
            autoPrint(cacheSize, cacheOption, block, mmSize, mmOption, memory, cacheAccess, memoryTime);
            form.reset();
        } else if (mmSize.value != "" && cacheBlockSize != "" && memory.value != "" && cacheOption.value != "B/W" && mmOption.value != "B/W") {
            var mem = memory.value.split(",");
            var memInt = mem.map(Number);
            console.log("HERE2");

            if (mmOption.value == "Words") {
                var bits, T, B, W;
                let temp = false, i = 0, ans;
                while (!temp) {
                    if (i == 0) {
                        ans = 1;
                    }
                    else {
                        ans *= 2;
                    }

                    if (mmSize.value == ans) {
                        temp = true;
                        bits = i;
                    }
                    if (block.value == ans) {
                        W = i;
                    }
                    if (cacheBlockSize == ans) {
                        B = i;
                    }
                    i++;
                }
                T = bits - W - B;
                console.log(T);
                console.log(B);
                console.log(W);

                binaryMemory = convertToBinary(memInt);

                let properBinary = [];
                properBinary = convertProperBinary(binaryMemory, bits);
                console.log(properBinary);
                
                let sliceBinary = [];
                sliceBinary = removeWordBinary(properBinary, W);
                console.log(sliceBinary);

                let pickBinary = [];
                pickBinary = pickBitBinary(sliceBinary, B);
                console.log(pickBinary);

                let storeAns = [];
                let orderNum = [];
                storeAns = convertToDecimal(pickBinary);
                orderNum = convertToDecimal(binaryMemory);
                console.log(orderNum);
                console.log(storeAns);

                directMemory = directMapping2(orderNum, storeAns, cacheBlockSize);
                missPenalty = parseInt(cacheAccess.value) + parseInt(block.value) * parseInt(memoryTime.value) + parseInt(cacheAccess.value);
                average = (cacheHit / memInt.length) + (cacheMiss / memInt.length) * missPenalty;
                total = (parseInt(block.value) * cacheHit * parseInt(cacheAccess.value)) + cacheMiss * parseInt(block.value) * (parseInt(cacheAccess.value) + parseInt(memoryTime.value)) + (cacheMiss * parseInt(cacheAccess.value)) ;
            }
            else {
                /*NOT DONE HERE*/
                var bits, T, B, W;
                let temp = false, i = 0, ans;
                while (!temp) {
                    if (i == 0) {
                        ans = 1;
                    }
                    else {
                        ans *= 2;
                    }

                    if (mmSize.value * block.value == ans) {
                        temp = true;
                        bits = i;
                    }
                    if (block.value == ans) {
                        W = i;
                    }
                    if (cacheBlockSize == ans) {
                        B = i;
                    }
                    i++;
                }
                T = bits - W - B;
                console.log(T);
                console.log(B);
                console.log(W);

                binaryMemory = convertToBinary(memInt);

                let properBinary = [];
                properBinary = convertProperBinary(binaryMemory, bits);
                console.log(properBinary);
                
                let sliceBinary = [];
                sliceBinary = removeWordBinary(properBinary, W);
                console.log(sliceBinary);

                let pickBinary = [];
                pickBinary = pickBitBinary(sliceBinary, B);
                console.log(pickBinary);

                let storeAns = [];
                let orderNum = [];
                storeAns = convertToDecimal(pickBinary);
                orderNum = convertToDecimal(binaryMemory);
                console.log(orderNum);
                console.log(storeAns);

                directMemory = directMapping2(orderNum, storeAns, cacheBlockSize);
                missPenalty = parseInt(cacheAccess.value) + parseInt(block.value) * parseInt(memoryTime.value) + parseInt(cacheAccess.value);
                average = (cacheHit / memInt.length) + (cacheMiss / memInt.length) * missPenalty;
                total = (parseInt(block.value) * cacheHit * parseInt(cacheAccess.value)) + cacheMiss * parseInt(block.value) * (parseInt(cacheAccess.value) + parseInt(memoryTime.value)) + (cacheMiss * parseInt(cacheAccess.value)) ;
            }
            autoPrint(cacheSize, cacheOption, block, mmSize, mmOption, memory, cacheAccess, memoryTime);
            form.reset();
        } else {
            document.querySelector('#error').innerHTML = "";
            document.querySelector('#error').innerHTML += "Fill up appropriate fields.";
        }
    });

    function autoPrint(cacheSize, cacheOption, block, mmSize, mmOption, memory, cacheAccess, memoryTime) {
        document.querySelector('#firstInput').innerHTML = "Cache Memory Size: " + cacheSize.value;
        document.querySelector('#secondInput').innerHTML = "Cache Memory Option: " + cacheOption.value;
        document.querySelector('#thirdInput').innerHTML = "Block Size: " + block.value;
        document.querySelector('#fourthInput').innerHTML = "Main Memory Size: " + mmSize.value;
        document.querySelector('#fifthInput').innerHTML = "Main Memory Option: " + mmOption.value;
        document.querySelector('#sixthInput').innerHTML = "Main Memory Sequence: " + memory.value;
        document.querySelector('#seventhInput').innerHTML = "Cache Access Time: " + cacheAccess.value + "ns";
        document.querySelector('#eighthInput').innerHTML = "Memory Access Time: " + memoryTime.value + "ns";

        document.querySelector('#cacheHit').innerHTML = "Cache Hit: " + cacheHit;
        document.querySelector('#cacheMiss').innerHTML = "Cache Miss: " + cacheMiss;
        document.querySelector('#missPenalty').innerHTML = "Miss Penalty: " + missPenalty + "ns";
        document.querySelector('#averageMAT').innerHTML = "Average Memory Access Time: " + average + "ns";
        document.querySelector('#totalMAT').innerHTML = "Total Memory Access Time: " + total + "ns";
        document.querySelector('#cacheMemory').innerHTML = "Cache Memory: " + directMemory;
    }

    function directMapping(memInt, cacheBlockSize) {
        newArr = [];
        //1,2,3,4,5,4,6,3
        for (i = 0; i < memInt.length; i++) {
            ans = memInt[i] % cacheBlockSize;
            if (newArr[ans] == memInt[i]){
                cacheHit++;
            }
            else {
                cacheMiss++;
            }
            newArr[ans] = memInt[i];
        } 
        return visualize(newArr, cacheBlockSize);
    }

    function visualize (newArr, cacheBlockSize) {
        for (i = 0; i < cacheBlockSize; i++) {
            if (newArr[i] == null) {
                newArr[i] = 'E';
            }
        }
        return newArr;
    }

    function directMapping2(orderNum, storeAns, cacheBlockSize) {
        newArr = [];
        //1,2,3,4,5,4,6,3
        for (i = 0; i < orderNum.length; i++) {
            if (newArr[storeAns[i]] == orderNum[i]){
                cacheHit++;
            }
            else {
                cacheMiss++;
            }
            newArr[storeAns[i]] = orderNum[i];
        } 
        return visualize2(newArr, cacheBlockSize);
    }

    function visualize2 (newArr, cacheBlockSize) {
        for (i = 0; i < cacheBlockSize; i++) {
            if (newArr[i] == null) {
                newArr[i] = 'E';
            }
        }
        return newArr;
    }

    function convertToBinary (memInt) {
        let num, binary;
        let arr = [];
        for (i = 0; i < memInt.length; i++) {
            num = memInt[i];
            binary = (num % 2).toString();
            while (num > 1) {
                num = parseInt(num / 2);
                binary =  (num % 2) + (binary);
            }
            arr[i] = binary;
        }
        return arr;
    }

    function convertProperBinary (binaryMemory, bits) {
        let arr = [];
        for (i = 0; i < binaryMemory.length; i++) {
            arr[i] = binaryMemory[i].toString().padStart(bits, "0");
        }
        return arr;
    }

    function removeWordBinary (properBinary, W) {
        for (i = 0; i < properBinary.length; i++) {
            for (j = 0; j < W; j++) {
                properBinary[i] = properBinary[i].slice(0, -1);
            }
        }
        return properBinary;
    }

    function pickBitBinary (sliceBinary, B) {
        let tempo = B * -1;
        for (i = 0; i < sliceBinary.length; i++) {
            sliceBinary[i] = sliceBinary[i].slice(tempo);
        }
        return sliceBinary;
    }

    function convertToDecimal (arr) {
        for (i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i], 2);
        }
        return arr;
    }

    $("#printBtn").click(function () {
        results = "OUTPUTS:\n" + "Cache Hit: " + cacheHit + '\n' + "Cache Miss: " + cacheMiss 
        + '\n' + "Miss Penalty: " + missPenalty + "ns" + '\n' + "Average Memory Access Time: " + average 
        + "ns" + '\n' + "Total Memory Access Time: " + total + "ns" + '\n' + "Cache Memory: " + directMemory;
                  
        const blob = new Blob([results], {type:"text/plain"});
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "results.txt";
        link.href = href;
        link.click();
        URL.revokeObjectURL(href);
    });
});
