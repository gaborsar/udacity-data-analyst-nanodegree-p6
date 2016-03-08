/*global d3 */

d3.csv('pisa2012_explanatory.csv', function (rawData) {
  'use strict';

  var colorWhite = 'rgb(255, 255, 255)';
  var colorLightGrey3 = 'rgb(243, 243, 243)';
  var colorGrey = 'rgb(204, 204, 204)';
  var colorDarkGrey2 = 'rgb(153, 153, 153)';
  var colorDarkGrey3 = 'rgb(102, 102, 102)';
  var colorDarkGrey4 = 'rgb(67, 67, 67)';
  var colorDarkRed1 = 'rgb(204, 0, 0)';
  var colorDarkBlue1 = 'rgb(61, 133, 198)';

  var mathInterestQuestions = {
    'ST29Q01': 'I enjoy reading about mathematics',
    'ST29Q03': 'I look forward to my mathematics lessons',
    'ST29Q04': 'I do mathematics because I enjoy it',
    'ST29Q06': 'I am interested in the things I learn in mathematics', // main question
  };

  var teacherSupportQuestions = {
    'ST83Q01': 'The teacher lets us know we have to work hard',
    'ST83Q02': 'The teacher provides extra help when we need it',
    'ST83Q03': 'The teacher helps the us with our learning',
    'ST83Q04': 'The teacher gives us opportunity to express opinions'
  };

  var negativeAnswers = ['Strongly disagree', 'Disagree'];
  var positiveAnswers = ['Agree', 'Strongly agree'];
  var answers = negativeAnswers.concat(positiveAnswers);

  var legendData = [
    {
      mathInterestValue: 'Strongly disagree',
      x: 0
    },
    {
      mathInterestValue: 'Disagree',
      x: 110 + 30
    },
    {
      mathInterestValue: 'Agree',
      x: 110 + 30 + 55 + 30
    },
    {
      mathInterestValue: 'Strongly agree',
      x: 110 + 30 + 55 + 30 + 37 + 30
    }
  ];

  var selectedMathInterestKey = 'ST29Q06';

  var processedData = processData(rawData, selectedMathInterestKey);

  // FORMATTERS AND SCALES

  var mathInterestLabelFormat = d3.format('.0%');

  var color = d3.scale.ordinal()
    .domain(answers)
    .range([colorDarkRed1, colorDarkRed1, colorDarkBlue1, colorDarkBlue1]);

  var x = d3.scale.linear()
    .domain([0, 1])
    .rangeRound([0, 450])

  var y = d3.scale.ordinal()
    .domain(answers)
    .rangeRoundBands([0, 120], 0.2);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

  // DRAW CHART

  var d3Container = d3.select('div.d3-container');

  var chartContainer = d3Container
    .append('svg')
    .attr('class', 'chart-container')
    .attr('width', 1030)
    .attr('height', 712);

  // DRAW CHART - TITLE

  var titleContainer = chartContainer
    .append('g')
    .attr('class', 'title-container')
    .attr('transform', translate(350, 0));

  titleContainer
    .append('text')
    .text(mathInterestQuestions[selectedMathInterestKey])
    .attr('x', 0)
    .attr('y', 0)
    .attr('dy', 17)
    .style('font-size', '19px')
    .style('fill', colorDarkGrey4);

  // DRAW CHART - LEGEND

  var legendContainer = chartContainer
    .append('g')
    .attr('class', 'legend-container')
    .attr('transform', translate(350, 32));

  legendContainer
    .selectAll('text')
    .data(legendData)
    .enter()
    .append('text')
    .attr('class', function (d) {
      return className({
        negative: isNegativeAnswer(d.mathInterestValue),
        positive: isPositiveAnswer(d.mathInterestValue)
      });
    })
    .text(function (d) {
      return d.mathInterestValue;
    })
    .attr('x', function (d) {
      return d.x;
    })
    .attr('y', 0)
    .attr('dy', 12)
    .style('font-size', '13px')
    .style('font-weight', 'bold')
    .style('fill', colorGrey);

  legendContainer
    .selectAll('line')
    .data(legendData.slice(1))
    .enter()
    .append('line')
    .attr('x1', function (d) {
      return d.x - 15;
    })
    .attr('y1', 0)
    .attr('x2', function (d) {
      return d.x - 15;
    })
    .attr('y2', 15)
    .attr('stroke', colorGrey); // will be updated in the interactive part

  // DRAW CHART - TEACHER SUPPORT CONTAINER

  var teacherSupportContainer = chartContainer
    .selectAll('g.teacher-support-container')
    .data(processedData, function (d) {
      return d.key;
    })
    .enter()
    .append('g')
    .attr('class', 'teacher-support-container')
    .attr('transform', function (d, i) {
      return translate(0, i * 161 + 77);
    });

  // DRAW CHART - TEACHER SUPPORT QUESTION

  teacherSupportContainer
    .append('text')
    .text(function (d) {
      return teacherSupportQuestions[d.key];
    })
    .attr('x', 340)
    .attr('y', 0)
    .attr('dy', 12)
    .style('text-anchor', 'end')
    .style('font-size', '13px')
    .style('fill', colorDarkGrey3);

  teacherSupportContainer
    .append('line')
    .attr('x1', 350)
    .attr('y1', 8)
    .attr('x2', 800)
    .attr('y2', 8)
    .attr('stroke', colorGrey)
    .attr('stroke-dasharray', '3,3');

  // DRAW CHART - TEACHER SUPPORT AXIS

  teacherSupportContainer
    .append('g')
    .attr('class', 'axis y')
    .attr('transform', translate(350, 18))
    .call(yAxis)
    .style('font-size', '13px')
    .style('fill', colorDarkGrey2);

  // DRAW CHART - TEACHER SUPPORT ROWS

  var teacherSupportRows = teacherSupportContainer
    .selectAll('g.teacher-support-row')
    .data(function (d) {
      return d.values;
    })
    .enter()
    .append('g')
    .attr('class', 'teacher-support-row')
    .attr('transform', function (d) {
      return translate(350, y(d.key) + 18);
    })

  // DRAW CHART - MATH INTEREST BARS

  teacherSupportRows
    .selectAll('rect.bar')
    .data(function (d) {
      return d.values;
    })
    .enter()
    .append('rect')
    .attr('class', function (d) {
      return className('bar', {
        negative: isNegativeAnswer(d.mathInterestValue),
        positive: isPositiveAnswer(d.mathInterestValue),
      });
    })
    .attr('x', function (d) {
      return x(d.x0);
    })
    .attr('y', 0)
    .attr('width', function (d) {
      return x(d.x1) - x(d.x0);
    })
    .attr('height', y.rangeBand())
    .style('fill', colorLightGrey3) // will be updated in the interactive part
    .style('stroke', 'white');

  // DRAW CHART - MATH INTEREST LABELS

  teacherSupportRows
    .selectAll('text.bar')
    .data(getLabelData)
    .enter()
    .append('text')
    .attr('class', function (d) {
      return className('bar', {
        negative: d.negative,
        positive: d.positive,
      });
    })
    .text(function (d) {
      return mathInterestLabelFormat(d.proportion);
    })
    .attr('x', function (d) {
      return d.negative ? x(d.x) + 5 : x(d.x) - 5;
    })
    .attr('y', y.rangeBand() / 2)
    .style('dominant-baseline', 'central')
    .style('text-anchor', function (d) {
      return d.negative ? 'start' : 'end';
    })
    .style('font-size', '11px')
    .style('fill', colorWhite)
    .style('fill-opacity', 0) // will be updated in the interactive part;

  // DRAW CHART - CAPTIONS

  var captionContainer = d3Container
    .append('div')
    .attr('class', 'caption-container');

  // DRAW CHART - NOTES

  var notesContainer = d3Container
    .append('div')
    .attr('class', 'note-container');

  notesContainer
    .append('p')
    .attr('class', 'note')
    .text('Based on background questionnaire as part of the 2012 PISA survey.');

  // DRAW CHART - INTERACTIVE ELEMENTS

  // step 1: add and show step button
  // step 2: click on step button
  // step 3: hide and remove step button
  // step 4: add negative caption (invisible)
  // step 5: show negative elements
  // step 6: add and show step button
  // step 7: click on step button
  // step 8: hide and remove step button
  // step 9: add positive caption (invisible)
  // step 10: hide negative and show positive elements
  // step 11: add sand show step button
  // step 12: click on step button
  // step 13: hide and remove step button
  // step 14: show negative elements and make captions interactive

  var stepButton = addStepButton('Start');

  stepButton.on('click', function () {

    hideAndRemoveStepButton(stepButton);
    addNegativeCaption();

    window.setTimeout(function () {

      showNegativeAndHidePositiveElements();
      stepButton = addAndShowStepButton('Next');

      stepButton.on('click', function () {

        hideAndRemoveStepButton(stepButton);
        addPositiveCaption();

        window.setTimeout(function () {

          hideNegativeAndShowPositiveElements();
          stepButton = addAndShowStepButton('Next');

          stepButton.on('click', function () {

            hideAndRemoveStepButton(stepButton);

            window.setTimeout(function () {

              showNegativeAndPositiveElements();
              makeCaptionsInteractive();

            }, 500);
          });
        }, 500);
      });
    }, 500);
  });

  function addStepButton(text) {
    return captionContainer
      .append('button')
      .attr('class', 'step')
      .text(text);
  }

  function addAndShowStepButton(text) {
    var stepButton;

    stepButton = addStepButton(text);

    stepButton
      .style('opacity', 0);

    stepButton
      .transition()
      .duration(1000)
      .style('opacity', 1);

    return stepButton;
  }

  function hideAndRemoveStepButton(stepButton) {
    stepButton
      .transition()
      .duration(500)
      .style('opacity', 0)
      .remove();
  }

  function showNegativeAndHidePositiveElements() {
    update(true, false, 1000);
  }

  function hideNegativeAndShowPositiveElements() {
    update(false, true, 1000);
  }

  function showNegativeAndPositiveElements() {
    update(true, true, 1000);
  }

  function addNegativeCaption() {
    captionContainer
      .append('div')
      .attr('class', 'caption negative')
      .html('Students who feel their teacher is <b>not supportive</b> are <b>less interested</b> in math.')
      .style('color', colorDarkRed1)
      .style('opacity', 0);
  }

  function addPositiveCaption() {
    captionContainer
      .append('div')
      .attr('class', 'caption positive')
      .html('Students who feel their teacher is <b>supportive</b> are <b>more interested</b> in math.')
      .style('color', colorDarkBlue1)
      .style('opacity', 0);
  }

  function makeCaptionsInteractive() {

    d3Container
      .selectAll('div.caption')
      .style('cursor', 'pointer');

    d3Container
      .selectAll('div.caption.negative')
      .on('mouseover', function () {
        update(true, false, 500);
      })
      .on('mouseout', function () {
        update(true, true, 500);
      });

    d3Container
      .selectAll('div.caption.positive')
      .on('mouseover', function () {
        update(false, true, 500);
      })
      .on('mouseout', function () {
        update(true, true, 500);
      });
  }

  // UPDATING FUNCTIONS

  function update(highlightNegative, highlightPositive, duration) {
    var transition = d3.transition().duration(duration);

    transition
      .selectAll('g.legend-container text.negative')
      .style('fill', function (d) {
        return highlightNegative ? color(d.mathInterestValue) : colorGrey;
      });

    transition
      .selectAll('g.legend-container text.positive')
      .style('fill', function (d) {
        return highlightPositive ? color(d.mathInterestValue) : colorGrey;
      });

    transition
      .selectAll('g.teacher-support-row rect.bar.negative')
      .style('fill', function (d) {
        return highlightNegative ? color(d.mathInterestValue) : colorLightGrey3;
      });

    transition
      .selectAll('g.teacher-support-row rect.bar.positive')
      .style('fill', function (d) {
        return highlightPositive ? color(d.mathInterestValue) : colorLightGrey3;
      });

    transition
      .selectAll('g.teacher-support-row text.bar.negative')
      .style('fill-opacity', highlightNegative ? 1 : 0);

    transition
      .selectAll('g.teacher-support-row text.bar.positive')
      .style('fill-opacity', highlightPositive ? 1 : 0);

    transition
      .select('div.caption.negative')
      .style('opacity', highlightNegative ? 1 : 0);

    transition
      .select('div.caption.positive')
      .style('opacity', highlightPositive ? 1 : 0);
  }

  // HELPER FUNCTIONS

  function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  function className() {
    return Array.prototype.map.call(arguments, function (argument) {
      if (typeof argument === 'object') {
        return Object.keys(argument).filter(function (key) {
          return argument[key];
        }).join(' ');
      } else {
        return argument;
      }
    }).join(' ');
  }

  function isPositiveAnswer(answer) {
    return positiveAnswers.indexOf(answer) !== -1;
  }

  function isNegativeAnswer(answer) {
    return negativeAnswers.indexOf(answer) !== -1;
  }

  // DATA PROCESSING FUNCTIONS

  function processData(rawData, selectedMathInterestKey) {
    return d3.nest()
      .key(function (d) {
        return d.teacherSupportKey;
      })
      .key(function (d) {
        return d.teacherSupportValue;
      })
      .rollup(function (v) {
        v.forEach(function (d, i) {
          d.x0 = i === 0 ? 0 : v[i - 1].x1;
          d.x1 = d.x0 + parseFloat(d.proportion, 10);
        });
        return v;
      })
      .entries(rawData.filter(function (d) {
        return d.mathInterestKey === selectedMathInterestKey;
      }));
  }

  function getLabelData(d) {
    return [
      {
        negative: true,
        x: 0,
        proportion: d3.sum(d.values.slice(0, 2), function (d) {
          return d.proportion;
        })
      },
      {
        positive: true,
        x: 1,
        proportion: d3.sum(d.values.slice(2), function (d) {
          return d.proportion;
        })
      }
    ];
  }
});
