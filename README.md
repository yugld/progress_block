### Progress Block

Реализация прототипа блока Progress для отображения прогресса выполнения процессов в мобильных web-приложениях.

Компонент состоит из нескольких частей: ProgressBlock (основной класс логики отображения прогресса), progressBlockElement (генерация DOM-структуры блока - перенесла из html для упрощения дальнейшего переиспользования), в initProgressBlock настраиваем обработчики событий. Перенесла работу с DOM в initProgressBlock, чтобы класс ProgressBlock оставался универсальным и не был привязан к шаблону верстки

```js
import { initProgressBlock } from "./initProgressBlock.js";

const mountPoint = document.getElementById("app");
const progress = initProgressBlock(mountPoint);

```

Этот класс предоставляет API для управления состоянием блока:

- `setValue(value)` — задаёт прогресс (от 0 до 100), отображая дугу
- `setAnimated(isAnimated)` — включает или отключает вращающуюся анимацию
- `setHidden(isHidden)` — скрывает или показывает блок
- `update({ value, animated, hidden })` — одновременно обновляет все параметры
- `reset()` — сбрасывает все параметры к значениям по умолчанию
- `setDisplayValueVisible(isVisible)` - показывает/скрывает числовое значение

Основные возможности:

- Вводить число для изменения прогресса.
- Переключатели для: включения/отключения анимации; скрытия/отображения блока; отображения числового значения.
- Адаптивность интерфейса при смене ориентации устройства

Дополнитьельно с помощью нопки More (справа наверху):
- Возможность автоматического увеличения прогресса
- Сброс всех параметров одним переключателем
- Возможность просмотра цифрового прогресса внутри круга
  

### Ссылка на проект
[GitHub Pages](https://yugld.github.io/progress_block/)

P.S.
Кнопку "More" реализовала через абсолютное позиционирование, чтобы совсем не отходить от макета. Но если подойти к задаче смелее, её можно было бы разместить в .controls-group и плавно раскрывать все контролы с помощью transition.
