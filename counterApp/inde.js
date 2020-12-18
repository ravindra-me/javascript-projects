
function main(){
   
    let increment =  document.querySelector('.btn-increment');
    let decrement = document.querySelector('.btn-decrement');
    let reset = document.querySelector('.btn-reset');
    let number = document.querySelector('.secondary-heading');

    let count = 0;


    function increageNumber(){

        count+=1;
        return number.innerText = count;
    }

    function decreageNumber(){
        count-=1;
        return number.innerText = count;
    }

    function resetNumber(){
        count=0;
        return number.innerText = count;
    }


    increment.addEventListener("click", increageNumber);
    decrement.addEventListener("click", decreageNumber);
    reset.addEventListener("click", resetNumber);


    number.innerText = count;

}

main();