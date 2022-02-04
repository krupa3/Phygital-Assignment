//defining Tree class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

var items = JSON.parse(localStorage.getItem("product") || "[]");

function show(){
  var result_string = "";
  var items = JSON.parse(localStorage.getItem("product") || "[]");
  taxonomy = document.getElementById("taxonomy1").value,
    category = document.getElementById("category1").value,
    subcategory = document.getElementById("subcategory1").value
  idx = items.findIndex(item => item.value.toLowerCase() == taxonomy.toLowerCase());
  //checking for valid taxonomy
  if(idx==-1 || taxonomy.length==0){
    alert("Taxonomy Doest Not Exist, Please check your input!")
  }
  else{
  //check if category is given
  if(category.length == 0){
    //print all the products from taxonomy
    for(let i=0;i<items[idx].descendants.length;i++){
  
      for(let j = 0;j<items[idx].descendants[i].descendants.length;j++){

        for(let k = 0;k<items[idx].descendants[i].descendants[j].descendants.length;k++){
       
        result_string += "<b>Product Name:</b> "+items[idx].descendants[i].descendants[j].descendants[k].value +"<br><b>Levels:</b> "+items[idx].value+"-> "+items[idx].descendants[i].value.toLowerCase()+" ->"+items[idx].descendants[i].descendants[j].value+"<br>"
        }
      }
    }
  }
  else{
    idx1 = items[idx].descendants.findIndex(item => item.value.toLowerCase() == category.toLowerCase());
    //finding index of category in taxonomy
    
    if(idx1 == -1){
      alert("Category does not exist, Please check your input!");
    }
    else{
      //printing products from all categories
    if(subcategory.length==0){
      for(let j = 0;j<items[idx].descendants[idx1].descendants.length;j++){
        for(let k = 0;k<items[idx].descendants[idx1].descendants[j].descendants.length;k++){
        // console.log(items[idx].descendants[idx1].descendants[j].descendants[k].value)
        result_string += "<b>Product Name:</b> "+items[idx].descendants[idx1].descendants[j].descendants[k].value +"<br><b>Levels:</b> "+items[idx].value+"-> "+items[idx].descendants[idx1].value.toLowerCase()+" ->"+items[idx].descendants[idx1].descendants[j].value+"<br>"
        }
      }
    }
    else{
      idx2 = items[idx].descendants[idx1].descendants.findIndex(item => item.value.toLowerCase() == subcategory.toLowerCase()); //finding index of subcategory in category
      if(idx2==-1){
        alert("Subcategory Does Not Exist, Please Check Your Input!");
      }
      else{
        //printing products from all subcategories
      for(let i=0;i<items[idx].descendants[idx1].descendants[idx2].descendants.length;i++){

        result_string += "<b>Product Name:</b> "+items[idx].descendants[idx1].descendants[idx2].descendants[i].value +"<br><b>Levels:</b> "+items[idx].value+"-> "+items[idx].descendants[idx1].value.toLowerCase()+" ->"+items[idx].descendants[idx1].descendants[idx2].value+"<br>"
      }
      }
    }
    }
    }
    //writing the result output
    document.getElementById("result").innerHTML = result_string;
  }
  return false;  
}




function store() {
    let product_name = document.getElementById("product_name").value,
    taxonomy = document.getElementById("taxonomy").value,
    category = document.getElementById("category").value,
    subcategory = document.getElementById("subcategory").value
    //Checking if all the fields are filled
    if(product_name.length==0 || taxonomy.length==0 || category.length == 0 || subcategory.length == 0 ){
      alert("Please Fill all the values");
    }
    else{
      var items = JSON.parse(localStorage.getItem("product") || "[]");
      let idx = items.findIndex(item => item.value == taxonomy)
      if(idx != -1){
        //when the taxonomy exists
        idx1 = items[idx].descendants.findIndex(item => item.value == category)// checking if category exists
        if(idx1 != -1){
          //when category exists
          idx2 = items[idx].descendants[idx1].descendants.findIndex(item => item.value==subcategory)//checking if subcategory exists
          if(idx2!=-1){
          //if subcategory already exists
          idx3 = items[idx].descendants[idx1].descendants[idx2].descendants.findIndex(item => item.value == product_name) //search index of product_name in subcategory
            if(idx3 != -1){
              //if product already exists

              alert("Product already exists");
            }
            else{
              //adding product to the subcategory
              let pro = new TreeNode(product_name)
              idx3 = items[idx].descendants[idx1].descendants[idx2].descendants.push(pro);
              alert("Product Added Successfully");
            }
          }
          else{
            //creating new subcategory

            let sub = new TreeNode(subcategory)
            //inserting new subcategory in category
            items[idx].descendants[idx1].descendants.push(sub);
            let pro = new TreeNode(product_name);
            idx2 = items[idx].descendants[idx1].descendants.findIndex(item => item.value.toLowerCase()==subcategory.toLowerCase())
            //inserting product in the new subcategory
            items[idx].descendants[idx1].descendants[idx2].descendants.push(pro)
            alert("Product Added Successfully");
            
          }
        }
        else{
          //creating new category and subcategory
          let cat = new TreeNode(category)
          //inserting new category in taxonomy
          items[idx].descendants.push(cat);
          
          idx1 = items[idx].descendants.findIndex(item => item.value.toLowerCase() == category.toLowerCase());//finding the index of the new category in taxonomy
          let sub = new TreeNode(subcategory);
          //inserting new subcategory in category
          items[idx].descendants[idx1].descendants.push(sub);
        
          idx2 = items[idx].descendants[idx1].descendants.findIndex(item => item.value == subcategory);//finding index of new subcategory in category
          let pro = new TreeNode(product_name);
          //inserting new product in the subcategory
          items[idx].descendants[idx1].descendants[idx2].descendants.push(pro);
          alert("Product Added Successfully");
          // items.push(items[idx]);
        }

      }
      else{
        let dept = new TreeNode(taxonomy);
        let cat = new TreeNode(category);
        let sub = new TreeNode(subcategory);
        let pro = new TreeNode(product_name);

        dept.descendants.push(cat);
        cat.descendants.push(sub);
        sub.descendants.push(pro);
        items.push(dept);
  
        alert("Product Added Successfully");

      }
      
    //storing the new product in local storage
      localStorage.setItem('product', JSON.stringify(items));
  }
    
}