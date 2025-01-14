// performanceAnimation.js
export const animateCircles = () => {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach((circle) => {
      const percent = circle.getAttribute('data-percent');
      const circlePath = circle.querySelector('.progress-circle-path');
      const offset = 340 - (340 * percent) / 100;
      circlePath.style.strokeDashoffset = offset;
    });
  };
  