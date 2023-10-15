const modalBtn = $('.present__btn');
const modal = $('.modal-order');
const modalTitle = $('.modal-order__title');
const modalInput = $('.modal-order__input');

// Открыть модальное окно
modalBtn.click(() => {
  modal.show();
});

// Закрыть модальное окно
$('.modal-order__close').click(() => modal.hide());

// Поля ввода модального окна
modalInput.focus(function() {
  modalTitle.text(`Введите ${$(this).attr('placeholder').toLowerCase()}`);
});

modalInput.blur(() => {
  modalTitle.text('Заполните форму');
});

// Отправка формы
$('.modal-order__form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos',
    type: 'POST',
    data: $(this).serialize(),
    success(data) {
      console.log('Данные успешно отправлены');
      console.log(data);
      modalTitle.text(`Ваша заявка принята, номер ${data.id}`);
      $('.modal-order__form').slideUp(300);
    },
    error() {
      modalTitle.text('Что-то пошло не так.');
    },
  });

  /*
  $.post(
      'https://jsonplaceholder.typicode.com/todos',
      $(this).serialize()
          .then(function(data) {console.log(data)})
          .catch(function(err) {console.warn(err)}),
  );
*/
});

// Burger-меню
const body = $('body');

const animateMenu = (position, opacityValue) => {
$('.navigation').animate({
    left: position,
  }, 500, () => {
    $('.navigation__close').animate({
      opacity: opacityValue,
    }, 300, 'swing');
  });
};

$('.header__burger').click(() => animateMenu(0, 1));

body.click((e) => {
  const target = $(e.target);
  if (body.innerWidth() < 768 &&
  target.is(':not(.header__burger)') &&
  target.is(':not(.navigation)') &&
  target.is(':not(.navigation__list)') &&
  target.is(':not(.navigation__item > a)') &&
  target.is(':not(.navigation__city)') &&
  target.is(':not(.navigation__phone)') ||
  target.is('.navigation__close')) {
    animateMenu(-400, 0);
  }
});
