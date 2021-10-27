const box = document.querySelector(".box");
const coordinates = document.querySelector(".coordinates");
const hrLine = document.querySelector(".hr-line");
const vrLine = document.querySelector(".vr-line");

coordinates.innerHTML =
  Math.round(hrLine.clientWidth) + " + " + Math.round(vrLine.clientHeight);

box.addEventListener("mousedown", mousedown);

function mousedown(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    const rect = box.getBoundingClientRect();
    const hrRect = hrLine.getBoundingClientRect();
    const vrRect = vrLine.getBoundingClientRect();

    box.style.left = rect.left - newX + "px";
    box.style.top = rect.top - newY + "px";

    hrLine.style.width = hrRect.width - newX + "px";
    hrLine.style.top = hrRect.top - newY + "px";

    vrLine.style.height = vrRect.height - newY + "px";
    vrLine.style.left = vrRect.left - newX + "px";

    coordinates.innerHTML =
      Math.round(hrRect.width) + " + " + Math.round(vrRect.height);

    prevX = e.clientX;
    prevY = e.clientY;
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}

const nodes = document.querySelectorAll(".node");
let currentNode;

for (let node of nodes) {
  node.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    e.stopPropagation();
    currentNode = e.target;

    prevX = e.clientX;
    prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = box.getBoundingClientRect();
      const hrRect = hrLine.getBoundingClientRect();
      const vrRect = vrLine.getBoundingClientRect();

      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      coordinates.innerHTML =
        Math.round(hrRect.width) + " + " + Math.round(vrRect.height);

      if (currentNode.classList.contains("br")) {
        if (e.clientY > rect.top && e.clientX > rect.left) {
          box.style.width = rect.width - newX + "px";
          box.style.height = rect.height - newY + "px";

          hrLine.style.width = hrRect.width - newX / 2 + "px";
          hrLine.style.top = hrRect.top - newY / 2 + "px";

          vrLine.style.height = vrRect.height - newY / 2 + "px";
          vrLine.style.left = vrRect.left - newX / 2 + "px";
        }
      } else if (currentNode.classList.contains("bl")) {
        if (e.clientX <= rect.right && e.clientY > rect.y) {
          box.style.width = rect.width + newX + "px";
          box.style.height = rect.height - newY + "px";
          box.style.left = rect.left - newX + "px";

          hrLine.style.width = hrRect.width - newX / 2 + "px";
          hrLine.style.top = hrRect.top - newY / 2 + "px";

          vrLine.style.height = vrRect.height - newY / 2 + "px";
          vrLine.style.left = vrRect.left - newX / 2 + "px";
        }
      } else if (currentNode.classList.contains("tr")) {
        if (e.clientY <= rect.bottom && e.clientX >= rect.x) {
          box.style.width = rect.width - newX + "px";
          box.style.height = rect.height + newY + "px";
          box.style.top = rect.top - newY + "px";

          hrLine.style.width = hrRect.width - newX / 2 + "px";
          hrLine.style.top = hrRect.top - newY / 2 + "px";

          vrLine.style.height = vrRect.height - newY / 2 + "px";
          vrLine.style.left = vrRect.left - newX / 2 + "px";
        }
      } else {
        if (e.clientX <= rect.right && e.clientY <= rect.bottom) {
          box.style.width = rect.width + newX + "px";
          box.style.height = rect.height + newY + "px";
          box.style.top = rect.top - newY + "px";
          box.style.left = rect.left - newX + "px";

          hrLine.style.width = hrRect.width - newX / 2 + "px";
          hrLine.style.top = hrRect.top - newY / 2 + "px";

          vrLine.style.height = vrRect.height - newY / 2 + "px";
          vrLine.style.left = vrRect.left - newX / 2 + "px";
        }
      }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}
