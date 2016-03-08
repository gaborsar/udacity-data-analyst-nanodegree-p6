library(ggplot2)
library(reshape)

filename <- function (plot_type, x_param, y_param, ext) {
  plotname <- paste('plot', plot_type, x_param, y_param, sep='_')
  filename <- paste(plotname, ext, sep='.')
  return(filename)
}

barchart <- function (raw_data, x_param, y_param, x_lab, y_lab, x_levels) {

  sub_data <- raw_data[!is.na(raw_data[x_param]),]
  sub_data <- sub_data[!is.na(sub_data[y_param]),]
  sub_data <- aggregate(sub_data[[y_param]], list(sub_data[[x_param]]), mean)
  colnames(sub_data) <- c(x_param, y_param)

  ggplot(aes_string(x=x_param, y=y_param), data=sub_data) +
    geom_bar(stat='identity', fill='darkblue') +
    scale_x_discrete(limits=x_levels) +
    xlab(x_lab) +
    ylab(y_lab)

  ggsave(filename('bar', x_param, y_param, 'png'))
}

barcharts <- function (raw_data, x_configs, y_configs, x_levels) {
  for (x_config in x_configs) {
    for (y_config in y_configs) {
      barchart(
        raw_data,
        x_config[1],
        y_config[1],
        x_config[2],
        y_config[2],
        x_levels
      )
    }
  }
}

heathmap <- function (raw_data, x_param, y_param, x_lab, y_lab, x_levels, y_levels) {

  sub_data <- raw_data[!is.na(raw_data[x_param]),]
  sub_data <- sub_data[!is.na(sub_data[y_param]),]
  sub_data <- table(raw_data[[x_param]], raw_data[[y_param]])
  sub_data <- prop.table(sub_data, 1)
  sub_data <- as.data.frame(sub_data)
  sub_data$Freq <- round(sub_data$Freq * 100)
  sub_data$FreqBin <- as.integer(sub_data$Freq <= (75/2))

  ggplot(sub_data, aes(x=Var1, y=Var2)) +
    geom_tile(aes(fill=Freq)) +
    geom_text(aes(label=Freq, color=FreqBin)) +
    scale_fill_gradient(limits=c(0, 75), low='white', high='darkblue', guide=FALSE) +
    scale_color_gradient(limits=c(0, 1), low='white', high='darkblue', guide=FALSE) +
    scale_x_discrete(limits=x_levels) +
    scale_y_discrete(limits=y_levels) +
    xlab(x_lab) +
    ylab(y_lab)

  ggsave(filename('heat', x_param, y_param, 'png'))
}

heathmaps <- function (raw_data, x_configs, y_configs, x_levels, y_levels) {
  for (x_config in x_configs) {
    for (y_config in y_configs) {
      heathmap(
        raw_data,
        x_config[1],
        y_config[1],
        x_config[2],
        y_config[2],
        x_levels,
        y_levels
      )
    }
  }
}

# raw data

raw_data <- read.csv('pisa2012_exploratory.csv')

# levels

ISCED_levels <- c(
  'None',
  'ISCED 1',
  'ISCED 2',
  'ISCED 3B, C',
  'ISCED 3A, 4',
  'ISCED 5B',
  'ISCED 5A, 6'
)

perseverance_levels <- c(
  'Not at all like me',
  'Not much like me',
  'Somewhat like me',
  'Mostly like me',
  'Very much like me'
)

sense_of_belonging_levels <- c(
  'Strongly disagree',
  'Disagree',
  'Agree',
  'Strongly agree'
)

math_interest_levels <- sense_of_belonging_levels

teacher_support_levels <- sense_of_belonging_levels

# barcharts - Educational level of mother/father vs Out-of-School Study Time

x_configs <- list(
  c('MISCED', 'Educational level of mother (ISCED)'),
  c('FISCED', 'Educational level of father (ISCED)')
)

y_configs <- list(
  c('ST57Q01', 'Out-of-School Study Time - Homework'),
  c('ST57Q02', 'Out-of-School Study Time - Guided Homework'),
  c('ST57Q03', 'Out-of-School Study Time - Personal Tutor'),
  c('ST57Q04', 'Out-of-School Study Time - Commercial Company'),
  c('ST57Q05', 'Out-of-School Study Time - With Parent'),
  c('ST57Q06', 'Out-of-School Study Time - Computer')
)

barcharts(
  raw_data,
  x_configs,
  y_configs,
  ISCED_levels
)

# heatmaps - Educational level of mother/father vs Perseverance

x_configs <- list(
  c('MISCED', 'Educational level of mother (ISCED)'),
  c('FISCED', 'Educational level of father (ISCED)')
)

y_configs <- list(
  c('ST93Q01', 'Perseverance - Give up easily'),
  c('ST93Q03', 'Perseverance - Put off difficult problems'),
  c('ST93Q04', 'Perseverance - Remain interested'),
  c('ST93Q06', 'Perseverance - Continue to perfection'),
  c('ST93Q07', 'Perseverance - Exceed expectations')
)

heathmaps(
  raw_data,
  x_configs,
  y_configs,
  ISCED_levels,
  perseverance_levels
)

# heatmaps - Educational level of mother/father vs Sense of Belonging

x_configs <- list(
  c('MISCED', 'Educational level of mother (ISCED)'),
  c('FISCED', 'Educational level of father (ISCED)')
)

y_configs <- list(
  c('ST87Q01', 'Sense of Belonging - Feel Like Outsider'),
  c('ST87Q02', 'Sense of Belonging - Make Friends Easily'),
  c('ST87Q03', 'Sense of Belonging - Belong at School'),
  c('ST87Q04', 'Sense of Belonging - Feel Awkward at School'),
  c('ST87Q05', 'Sense of Belonging - Liked by Other Students'),
  c('ST87Q06', 'Sense of Belonging - Feel Lonely at School'),
  c('ST87Q07', 'Sense of Belonging - Feel Happy at School'),
  c('ST87Q08', 'Sense of Belonging - Things Are Ideal at School'),
  c('ST87Q09', 'Sense of Belonging - Satisfied at School')
)

heathmaps(
  raw_data,
  x_configs,
  y_configs,
  ISCED_levels,
  sense_of_belonging_levels
)

# heatmaps - Educational level of mother/father vs Math Interest

x_configs <- list(
  c('MISCED', 'Educational level of mother (ISCED)'),
  c('FISCED', 'Educational level of father (ISCED)')
)

y_configs <- list(
  c('ST29Q01', 'Math Interest - Enjoy Reading'),
  c('ST29Q03', 'Math Interest - Look Forward to Lessons'),
  c('ST29Q04', 'Math Interest - Enjoy Maths'),
  c('ST29Q06', 'Math Interest - Interested')
)

heathmaps(
  raw_data,
  x_configs,
  y_configs,
  ISCED_levels,
  math_interest_levels
)

# heathmaps - Educational level of mother vs Educational level of father

heathmap(
  raw_data,
  'MISCED',
  'FISCED',
  'Educational level of mother (ISCED)',
  'Educational level of father (ISCED)',
  ISCED_levels,
  ISCED_levels
)

# heathmaps - Teacher Support vs Sense of Belonging

x_configs <- list(
  c('ST83Q01', 'Teacher Support - Lets Us Know We Have to Work Hard'),
  c('ST83Q02', 'Teacher Support - Provides Extra Help When Needed'),
  c('ST83Q03', 'Teacher Support - Helps Students with Learning'),
  c('ST83Q04', 'Teacher Support - Gives Opportunity to Express Opinions')
)

y_configs <- list(
  c('ST87Q01', 'Sense of Belonging - Feel Like Outsider'),
  c('ST87Q02', 'Sense of Belonging - Make Friends Easily'),
  c('ST87Q03', 'Sense of Belonging - Belong at School'),
  c('ST87Q04', 'Sense of Belonging - Feel Awkward at School'),
  c('ST87Q05', 'Sense of Belonging - Liked by Other Students'),
  c('ST87Q06', 'Sense of Belonging - Feel Lonely at School'),
  c('ST87Q07', 'Sense of Belonging - Feel Happy at School'),
  c('ST87Q08', 'Sense of Belonging - Things Are Ideal at School'),
  c('ST87Q09', 'Sense of Belonging - Satisfied at School')
)

heathmaps(
  raw_data,
  x_configs,
  y_configs,
  teacher_support_levels,
  sense_of_belonging_levels
)

# heathmaps - Teacher Support vs Math Interest

x_configs <- list(
  c('ST83Q01', 'Teacher Support - Lets Us Know We Have to Work Hard'),
  c('ST83Q02', 'Teacher Support - Provides Extra Help When Needed'),
  c('ST83Q03', 'Teacher Support - Helps Students with Learning'),
  c('ST83Q04', 'Teacher Support - Gives Opportunity to Express Opinions')
)

y_configs <- list(
  c('ST29Q01', 'Math Interest - Enjoy Reading'),
  c('ST29Q03', 'Math Interest - Look Forward to Lessons'),
  c('ST29Q04', 'Math Interest - Enjoy Maths'),
  c('ST29Q06', 'Math Interest - Interested')
)

heathmaps(
  raw_data,
  x_configs,
  y_configs,
  teacher_support_levels,
  math_interest_levels
)
