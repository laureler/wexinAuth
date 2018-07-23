export default function (el, binding) {
      // document.title = el.dataset.title
    
      el.addEventListener('click',function(){
        this.parentNode.childNodes.forEach(function(value,index,array){
             if(value!=undefined){
                 value.style.borderBottom=' 0.053333rem solid #fff';
             }
        });
        this.style.borderBottom=' 0.053333rem solid #d12929';
      })
      
}
