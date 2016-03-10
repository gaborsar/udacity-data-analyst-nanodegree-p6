# Interest in mathematics varies by teacher support

## Summary

PISA (Programme for International Student Assessment) is an international survey which aims to evaluate the educational systems of the world. As part of the 2012 PISA survey students answered a background questionnaire, that contained questions about their home, school, and learning environment. A group of questions concentrated on how supportive the teachers are, and another group on how interested the student are in mathematics. My visualization shows a relationship between these two groups of questions.

## Design

### [Iteration 1](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/73dc99b5614c1409a65df98f017ffec70fa84b4c/)

The stacked bar chart is good in showing part to whole relationships, so I picked that to visualize the proportion of students who selected each mathematical interest answer (bar), across each teacher support answer (group), given to each teacher support question (super group).

As the direction of the answers (not interested in mathematics, interested in mathematics) is more important than the actual answers, I decided to color by the former. To make it clear that colors represent mathematical interest answers, I used the Gestalt principle of proximity and moved the legend close to the main mathematical interest question, and far from the teacher support questions. To maximize the contrast and make the visualization accessible to color-blind viewers, I selected red for the negative and blue for the positive direction.

I removed the x-axis and showed the proportions directly on the bars, to make it easier to compare them line by line.

I also used the Gestalt principle of proximity to separate the teacher support questions from each other and the main mathematical interest question. I colored the main mathematical interest question darker then the teacher support questions, and the teacher support questions darker than the answers are given to them, to highlight the hierarchy.

To help the interpretation of the story, I added two callout boxes, to explain both sides of it. To indicate the relationship between the boxes and the direction of the answers they belong to I used the Gestalt principle of similarity, and colored them the same (red for negative, blue for positive).

To help the interpretation, I decided to show only the minimal information and increase the amount of it step by step:
 1. Show the visualization without highlighting anything (everything is gray).
 2. Highlight the negative elements of the visualization, to show how the number of students who are not interested in mathematics decreases as the supportiveness of the teachers increases.
 3. Highlight the positive elements of the visualization, to show how the number of students who are interested in mathematics increases as the supportiveness of the teachers increases.
 4. Highlight everything.

I decided to show both the negative and the positive part of the story, to make sure it is well understood, using to the power of repetition.

### [Iteration 2](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/56af718df6a8a12e7fbb036982c7535443f20422/)

Feedback suggested that it was complicated to understand what the bars mean because only one summed percentage was visible on them. To fix that I added individual percentage values and made them visible on mouseover.

### [Iteration 3](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/cea7f5b7630024b6957812bcbc1fb9187495c2b0/)

Feedback suggested the summary text was too long. I made it shorter, and simpler to understand.

### [Iteration 4](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/3a49e0eaf1b7791b8de6ce0ca6942c548d1039b5/)

Fixed typo (*"The teacher helps the us with our learning"* to *"The teacher helps us with our learning"*).

### [Iteration 5](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/999d9efa104883eb46fff75690d54579c3d8e892/)

Based on further feedback about the summary I did split long sentences to shorter ones.

### [Iteration 6](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/461c0b1fd2d90b855e1463c1ef523efce1537a9c/)

Based on further feedback I made individual percentages default and removed summed percentages.
I added more colors (shades) to make a clean separation between the mathematical interest answers.
I also made the legend more conventional, as the simple text legend was not intuitive enough.

### [Iteration 7](http://bl.ocks.org/gaborsar/raw/56d225b31c1eaf24eccb/b9e78ccda132070bc45a4e6d25c8af2af747a834/)

Further feedback suggested that the changes introduced in the previous iteration added clutter that made interpretation more difficult. To fix this I reverted to the original two colors, and I also made the percentage values only visible on mouseover.

As these changes lead back to the original unintuitive nature of the chart, I decided to add an x-axis. I had the feeling that without the disturbing summed percentages and with the more conventional legend it should improve the intuitiveness of the chart.

Feedback also suggested that the moving position of the `Start` and `Next` buttons was disturbing and harmed the user experience. In response, I made the button positions fixed.

## Feedback

 * [Udacity Discussion Forum](https://discussions.udacity.com/t/final-project-feedback-pisa-interest-in-mathematics-varies-by-teacher-support/159958)
 * [Google+ Udacity's Data Analyst Nanodegree Community](https://plus.google.com/u/0/101569911673430269340/posts/DjjtgceoDuf)

## Resources

[pisa_2012_results_in_focus]: http://www.oecd.org/pisa/keyfindings/pisa-2012-results-overview.pdf
[pisa_2012_database]: https://pisa2012.acer.edu.au/downloads.php
[storytellingwithdata_book]: http://www.storytellingwithdata.com/book/
[d3_normalized_stacked_bar_chart]: https://bl.ocks.org/mbostock/3886394

1. [PISA 2012 Results in Focus][pisa_2012_results_in_focus]
2. [PISA 2012 Database][pisa_2012_database]
3. [Cole Nussbaumer Knaflic, storytelling with data][storytellingwithdata_book]
4. [Normalized Stacked Bar Chart][d3_normalized_stacked_bar_chart]
