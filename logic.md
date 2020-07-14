Chart()
    type: bar chart

What do we need?
    > labels: a global reference to all instances
    of when a user exercises
> timeArr <- getData()

    > Data for each exercise
# Issue: I need the dates from the timeArr to match
# the dates when a certain exercise is done




time  = [6/9, 6/28, 7/12, null]
benchtime = [null, ]
          [100, 55, 60, 111, null]

        = [6/8, null, 6/28, null, null]

Mapping = {key, value}
          {'6/8' : 100}

* [X] ~~*Get bench date*~~ [2020-07-14]
* [X] ~~*Map the keys (date) -> value (weight)*~~ [2020-07-14]
> time = [ "6/8", "6/9", "7/12" ]
> benchw = [ 100, 55, 111 ]

Map(3) { "6/8" → 100, "6/9" → 55, "7/12" → 111 }

> Find all bench times
    > Then replace the dates with their mapping weight

Compare time with timeArr

timeArr = [6/8, 6/9, 6/28, 7/12, 7/13]
time = [ "6/8", "6/9", "7/12" ]
 ["6/8", null, null, "7/12", null ]

 indexOf() ->  [0, 1, 3]