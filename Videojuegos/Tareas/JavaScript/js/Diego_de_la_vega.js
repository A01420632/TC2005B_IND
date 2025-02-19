//Diego de la Vega Saishio - A01420632
//Actividad en clase: Javascript

"use strict";

//First Non Repeating
export function firstNonRepeating(string) {
    for (let i=0; i<string.length; i++) {
        let repeated = false;
        for (let j=0; j<string.length; j++) {
            if (string[i] == string[j] && i != j) {
                repeated = true;
                break;
            }
        }
        //console.log(`Char: ${string[i]}, repeated: ${repeated}`);
        if (!repeated) {
            return string[i];
        }
    }
}
console.log(firstNonRepeating('abacddbec'));

//Bubble Sort
export function bubbleSort(arreglo){
    let tamaño= arreglo.length;
    let temp;
    let flag;
    do{
        flag=false;
        for(let i= 0; i<tamaño-1; i++){
            if(arreglo[i]>arreglo[i + 1]){
                temp= arreglo[i];
                arreglo[i]= arreglo[i+1];
                arreglo[i+1]= temp;
                flag=true;
            }
        }
        tamaño--;
    }while(flag);
return arreglo;
}

console.log(bubbleSort([8,1,6,7,3,2]));

//Funcion invertArray

export function invertArray(array){
    let result=[];
    for(let i=array.length-1; i>=0; i--){
        result.push(array[i]);
    }
    return result;
}

console.log(invertArray(['h','o','l','a']));

//Funcion invertArrayInPlace
export function invertArrayInplace(array){
    for(let i=0, j=array.length-1;i<j;i++,j--){
        let a= array[i];
        array[i]= array[j];
        array[j]= a;
    }
}

console.log(invertArrayInplace(['a','d','i','o','s']));

//Función capitalize
export function capitalize(cadena){
    if(!cadena || cadena.length==0){
        return '';
    }
    let temp= [];
    temp.push(cadena[0].toUpperCase());
    for(let i=1;i<cadena.length;i++){
        if(cadena[i-1]==' ')
            temp.push(cadena[i].toUpperCase());
        else
            temp.push(cadena[i]);
    }
    return temp.join('');
}

console.log(capitalize("hola como estas"));


//Función mcd
export function mcd(n1,n2){
    if(n1==0)
        return n2;
    else if(n2==0)
        return n1;
    else if(n1==n2)
        return n1;
    else if(n1>n2){
        let res=n1%n2;
        return mcd(n2,res);
    }
    else if(n1<n2){
        let res2=n2%n1;
        return mcd(n1,res2);
    }
}

console.log(mcd(270,192));

//Función hackerSpeak
export function hackerSpeak(texto){
    let hacker=[];
    for(let i=0; i<texto.length; i++){
        if((texto[i])=='A'||texto[i]=='a')
            hacker.push('4');
        else if((texto[i])=='S'||texto[i]=='s')
            hacker.push('5');
        else if((texto[i])=='I'||texto[i]=='i')
            hacker.push('1');
        else if((texto[i])=='O'||texto[i]=='o')
            hacker.push('0');
        else if((texto[i])=='E'||texto[i]=='e')
            hacker.push('3');
        else if((texto[i])=='B'||texto[i]=='b')
            hacker.push('8');
        else if((texto[i])=='G'||texto[i]=='g')
            hacker.push('9');
        else
            hacker.push(texto[i]);
    }
    return hacker.join("");
}

console.log(hackerSpeak("Javascript es divertido"));

//Función factorize
export function factorize(num){
    let factores=[];
    for(let i=1; i<=num; i++){
        if(num%i==0){
            factores.push(i);
        }
    }
    return factores;
}

console.log(factorize(6));

//Función deduplicate
export function deduplicate(cadena1){
    let noRep=[];
    let vistos={};
    for(let i=0; i<cadena1.length; i++){
        let num=cadena1[i];
        if(!vistos[num]){
            vistos[num]=true;
            noRep.push(num);
        }
    }
    return noRep;
}

console.log(deduplicate([1,0,1,1,0,0]));

//Función deduplicate ordenando los valores:

// export function deduplicate(cadena1){
//     let noRep=[];
//     let cadenaOrd=cadena1.toSorted();
//     noRep.push(cadenaOrd[0]);
//     for(let i=1; i<cadenaOrd.length; i++){
//         let num= cadenaOrd[i];
//         if(num!=cadenaOrd[i-1])
//             noRep.push(num);
//     }
//     return noRep.join();
// }

// console.log(deduplicate([1,0,1,1,0,0]));


//Función findShortestString
export function findShortestString(oracion){
    if(oracion.length==0)
        return 0;
    let min=oracion[0].length;
    for(let i=1;i<oracion.length;i++){
        let palabra=oracion[i];
        if(palabra.length<min)
            min=palabra.length;
    }
    return min;
}

console.log(findShortestString(['Hola', 'como', 'estas', 'tu']));

//Funcion palindromo
export function isPalindrome(oracion){
    oracion=oracion.toLowerCase();
    oracion=oracion.replace(/\s/g,"");
    oracion=oracion.split('');
    for(let i=0; i<oracion.length/2;i++){
        if(oracion[i]!== oracion[oracion.length-1-i])
            return false;
    }
    return true;
}

console.log(isPalindrome("Anita lava la tina"));

//Funcion para ordenar strings
//Funcion map() y su sintaxis consultada con IA Copilot
//La opcion que tenía en mente era a traves de un for,
//pero no es eficiente en una cadena de textos muy grande
export function sortStrings(lista){
    let ord=lista.map(str => str.toLowerCase());
    ord.sort();
    return ord;
}

console.log(sortStrings(['Hola', 'como', 'estas', 'tu']));

//Funcion moda y media
export function stats(valores){
    //Funcion media
    if(valores.length==0)
        return [0,0];
    let lista=bubbleSort(valores);
    let media=0;
    for(let i=0; i<valores.length; i++){
        media+=valores[i];
    }
    media=media/valores.length;

    //Funcion moda
    let contador=0;
    let contador2=0;
    let modas=[];
    for(let i=0; i<lista.length;i++){
        if(lista[i]==lista[i+1])
            contador++;
        else{
            if(contador>contador2){
                modas=[lista[i]];
                contador2=contador;
            }
            else if(contador==contador2){
                modas.push(lista[i]);
            }
            contador=0;
        }
    }
    return [media,modas[0]];
}

console.log(stats([4, 4, 6, 8, 4, 4, 6, 8]));

//Funcion popularString
export function popularString(cadena){
    if(cadena.length==0)
        return "";
    let contador=0;
    let contadorA={};
    let modas;
    for(let i=0; i<cadena.length;i++){
        let string= cadena[i];
        if(contadorA[string])
            contadorA[string]++;
        else{
            contadorA[string]=1;
        }
        if(contadorA[string]>contador){
            contador=contadorA[string];
            modas=string;
        }
    }
    return modas;
}


console.log(popularString(['hola', 'bye', 'hola', 'adios', 'bye','bye']));

//Funcion isPowerOf
export function isPowerOf2(num){
    let valor=num;
    let potencia=true;
    while(valor>1){
        if(valor%2==0)
            valor= valor/2;
        else{
            potencia=false;
            break;
        }
    }
    return potencia;
}

console.log(isPowerOf2(14));

//Funcion sortDescending
export function sortDescending(lista){
    let tamaño=lista.length;
    let ordenA=bubbleSort(lista);
    let ordenF=invertArray(ordenA);
    return (ordenF);
}

console.log(sortDescending([8,1,6,7,3,2]));