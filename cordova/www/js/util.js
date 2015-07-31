function isArray(arr) 
{ 
    return arr instanceof Array; 
} 

function isObject(arr) 
{ 
    return arr instanceof Object; 
} 

function countCartSize( cartList){
    var cnt = 0;
    for(item in cartList){
        // cnt = cnt + cartList[item]['number'];
        cnt = cnt + cartList[item];
    }
    return cnt;
}

function logComplexeArray(arr){
    for( i in arr){
        console.log(' logComplexeArray      i = ' + i);
        console.log(' logComplexeArray      val = ' + arr[i]);
        if (isArray(arr[i]) || isObject(arr[i])) {
            console.log(' logComplexeArray      val = ' + arr[i] + "==================");
            logComplexeArray(arr[i]);
            console.log(' logComplexeArray      val = ' + arr[i] + "------------------");
        };
    }
}
