# Interest in mathematics varies by teacher support

## Summary

PISA (Programme for International Student Assessment) is an international survey which aims to evaluate the educational systems of the world. As part of the 2012 PISA survey students answered a background questionnaire, that contained questions about their home, school, and learning environment. A group of questions concentrated on how supportive the teachers are, and another group on how interested the student are in mathematics. My visualization shows a relationship between these two groups of questions.

## Design

The stacked bar chart is good in showing part to whole relationships, so I picked that to visualize the proportion of students, who selected each mathematical interest answer (bar), across each teacher support answer (group), given to each teacher support question (super group).

As the direction of the answers (not interested in mathematics, interested in mathematics) is more important than the actual answers, I decided to color by the former. To make it clear that colors represent mathematical interest answers, I used the Gestalt principle of proximity and moved the legend close to the main mathematical interest question, and far from the teacher support questions. To maximize the contrast and make the visualization accessible to color-blind viewers, I selected red for the negative and blue for the positive direction.

I removed the x-axis and showed the proportions directly on the bars, to make it easier to compare them line by line.

I also used the Gestalt principle of proximity to separate the teacher support questions from each other and the main mathematical interest question. I colored the main mathematical interest question darker then the teacher support questions, and the teacher support questions darker than the answers are given to them, to highlight the hierarchy between them.

To help the interpretation of the story, I added two callout boxes, to explain both sides of it. To indicate the relationship between the boxes and the direction of the answers they belong to I used the Gestalt principle of similarity, and colored them the same (red for negative, blue for positive).

To help the interpretation, I decided to show only the minimal information and increase the amount of it step by step:
 1. Show the visualization without highlighting anything (everything is gray).
 2. Highlight the negative elements of the visualization, to show how the number of students who are not interested in mathematics decreases as the supportiveness of the teachers increases.
 3. Highlight the positive elements of the visualization, to show how the number of students who are interested in mathematics increases as the supportiveness of the teachers increases.
 4. Highlight everything.

I decided to show both the negative and the positive part of the story, to make sure it is well understood, using to the power of repetition.

## Feedback

## Resources

[pisa_2012_results_in_focus]: http://www.oecd.org/pisa/keyfindings/pisa-2012-results-overview.pdf
[pisa_2012_database]: https://pisa2012.acer.edu.au/downloads.php
[storytellingwithdata_book]: http://www.storytellingwithdata.com/book/
[d3_normalized_stacked_bar_chart]: https://bl.ocks.org/mbostock/3886394

1. [PISA 2012 Results in Focus][pisa_2012_results_in_focus]
2. [PISA 2012 Database][pisa_2012_database]
3. [Cole Nussbaumer Knaflic, storytelling with data][storytellingwithdata_book]
4. [Normalized Stacked Bar Chart][d3_normalized_stacked_bar_chart]
