// REMARK.JS FUNCTIONALITY
var slideshow = remark.create({
    highlightLanguage: 'javascript',
    highlightStyle: 'monokai',
    navigation: {
      scroll: false,
      click: false
    }
  });
  // Resize the remark scaler to be full screen
  $(function () {
    setRemarkSizes();
    $(window).resize(function () {
      setRemarkSizes();
    });
  });

  //take care of IE problem and resizing
  function setRemarkSizes() {
    $('.remark-slide-scaler').height($(window).height())
      .width($(window).width())
      .css('top', '0px')
      .css('left', '0px')
      .css('-webkit-transform', 'none');
  }
  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', () => {
    slideshow.gotoNextSlide();
  })
  const previousButton = document.getElementById('previous-button');
  previousButton.addEventListener('click', () => {
    slideshow.gotoPreviousSlide();
  })

// MYGA COMPONENTS FUNCTIONALITY
document.querySelectorAll('.multiple-choice-radio-submit').forEach((el)=>{
    el.addEventListener('click', function(e){
        const remarkSlide = e.target.closest('.remark-slide-content')
        remarkSlide.querySelectorAll('label').forEach((lbl)=>{
            lbl.classList.remove('correct-answer-label');
            lbl.classList.remove('incorrect-answer-label');
        })
        remarkSlide.querySelectorAll('input').forEach((radioInput)=>{
            if(radioInput.checked){
                if(radioInput.getAttribute("correct") == "true"){
                    remarkSlide.querySelector(`label[for="${radioInput.id}"]`).classList.add("correct-answer-label")
                }else{
                    remarkSlide.querySelector(`label[for="${radioInput.id}"]`).classList.add("incorrect-answer-label")
                }
            }
        })
        remarkSlide.querySelectorAll('input[correct="true"]').forEach((checkboxInput)=>{
            remarkSlide.querySelector(`label[for="${checkboxInput.id}"]`).classList.add("correct-answer-label")
        })
    })
})

document.querySelectorAll('.multiple-choice-checkbox-submit').forEach((el)=>{
    el.addEventListener('click', function(e){
        const remarkSlide = e.target.closest('.remark-slide-content')
        remarkSlide.querySelectorAll('label').forEach((lbl)=>{
            lbl.classList.remove('correct-answer-label');
            lbl.classList.remove('incorrect-answer-label');
        })
        const answersSelected = []
        remarkSlide.querySelectorAll('input[type="checkbox"]').forEach((checkboxInput)=>{
            if(checkboxInput.checked){
                answersSelected.push(checkboxInput.id)
                if(checkboxInput.getAttribute("correct") == "true"){
                    remarkSlide.querySelector(`label[for="${checkboxInput.id}"]`).classList.add("correct-answer-label")
                }else{
                    remarkSlide.querySelector(`label[for="${checkboxInput.id}"]`).classList.add("incorrect-answer-label")
                }
            }
        })
        remarkSlide.querySelectorAll('input[correct="true"]').forEach((checkboxInput)=>{
            remarkSlide.querySelector(`label[for="${checkboxInput.id}"]`).classList.add("correct-answer-label")
        })
    })
})