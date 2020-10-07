# Room Assignment Problem

This is an experiment powered by
[Empirica](https://empirica.ly/) (here is a basic
[tutorial](https://www.youtube.com/watch?v=K2YhEZey_58&list=PLPQelvUwyVgiawBDk3Sp74QMfL8RPgORW&index=1)).
Through this experiment we attempt to answer the question: **How does team
composition affect team performance?**

## Experiment Details:

### The task

In this experiment, participants are asked to assign N students into M rooms to
maximize utility while respecting certain constraints. The task difficulty can
vary in complexity levels:

* High complexity: Assign 9 students to 6 rooms given 8 constraints
* Low complexity: Assign 6 students to 4 rooms given 2 constraints

When the task is performed in groups then:

* All participants can do the assignment simultaneously, however, ony one
  student can be moved by one player at any given time (i.e., locking the
  student being moved, but the others are free to be moved).
* Participants can chat freely using the in-experiment chatting system.
* All events (i.e., which student being assigned to which room etc) will be
  logged and announced in the experiment as they happen.

### Procedure

In the planned experiment, **in step 1** each participants will be asked to
complete a number of room assignment tasks and other test questions (e.g., read
emotions from eyes tests) individually. This will allow us to determine 3
attributes about the individual:

* Ability: measured by the performance in the game.
* Social Perceptiveness (SP): Measured through
  [Reading Emotions from Eye (RME)](https://github.com/amaatouq/RME_test) test.
* Cognitive Style (CS): an in-task measure of problem-solving style (e.g.,
  intuitive versus analytical).

Then, **in step 2**, we randomly construct teams of 3 participants.

## Experiment Demo:
You and a group of friends can play with this experiment as we ran it by following these instructions (assuming you have [Meteor installed](https://www.meteor.com/install)):

1. [Download](https://github.com/amaatouq/room-assignment.git) the repository (and unzip). Alternatively, from terminal just run:

```ssh
git clone https://github.com/amaatouq/room-assignment-csop
```

2. Go into the folder with `cd room-assignment-csop`
3. Install the required dependencies `meteor npm install`
4. Edit the `admin` password in the settings file `local.json` to something you like.
5. Run the local instance with `meteor --settings local.json`
6. Go to `http://localhost:3000/admin` (or whatever port you are running Meteor on).
7. login with the credentials username: `admin` and the password you have in `local.json`
8. Start a new batch with whatever configuration you want (see the example configuration).

### Example Config:

First, you have to enter the Configuration mode instead of the Monitoring model in the admin UI.

![config-mode][config-mode-image]

[config-mode-image]: ./readme_screenshots/configuration_mode.png

This will allow you to configure the experiment: Factors, Lobby, and Treatments. Now, you have the option to create your own configuration (see below) or load an example configuration by clicking on `import` and then choosing the file `./example-config.yaml`.
Loading the example configurations will choose some example values for the factors (i.e., independent variables), lobby configuration, and few treatments.

Now, you can go back to the Monitoring mode:

![monitoring-mode][monitoring-mode-image]

[monitoring-mode-image]: ./readme_screenshots/monitoring_mode.png

Now the **_Batchs_** tab make sure you add a new batch, add the treatments you want, choose your lobby configurations, and then **_start_** the batch.

![batches][batches-img]

[batches-img]: ./readme_screenshots/new_batch.png

Go to `http://localhost:3000/` and enjoy! If you don't have 3 friends to play with you, you always can use the `new player` button in development (for more details see this), which can add an arbitrary number players to the experiment while staying in the same browser (i.e., no need to open different browsers).

![game][game-img]

[game-img]: ./readme_screenshots/game.png


