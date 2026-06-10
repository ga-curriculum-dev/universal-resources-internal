# ![[tktk Module Name] - Setup](./assets/hero.png)

## Setup

Open your Terminal application and navigate to your `~/code/ga/lessons` directory:

```bash
cd ~/code/ga/lessons
```

<!-- tktk if starter code exists -->

Fork the [[tktk Module Name]](https://github.com/modular-curriculum-all-courses/[tktk-repo-name]) repository.

<!-- tktk if starting from scratch  -->

Make a new repository on [GitHub](https://github.com/) named `[tktk-repo-name]`.

<!-- tktk -->

```bash
git clone https://github.com/<your-username>/[tktk-repo-name].git
```

> 🚨 Do not copy the above command. It will not work. Your GitHub username will replace <github-username> (including the < and >) in the URL above.

Next, `cd` into your new cloned directory, `[tktk-repo-name]`:


```bash
cd [tktk-repo-name]
```

Initialize a new virtual environment inside your project directory and install Django:

```bash
pipenv install django
```

This command will create a new `Pipfile` and `Pipfile.lock` in your project directory, specifying Django as a dependency.

Activate the virtual environment:

```bash
pipenv shell
```

Start a new Django project within your virtual environment:

```bash
django-admin startproject [tktk-app-name]
```

Open the project's folder in your code editor:

```bash
code .
```

To deactivate the virtual environment when you're done, simply type:

```bash
exit
```