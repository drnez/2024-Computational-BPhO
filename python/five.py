import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')
fig, ax = plt.subplots()

def sin(deg):
    return math.sin(math.radians(deg))
def cos(deg):
    return math.cos(math.radians(deg))
def tan(deg):
    return math.tan(math.radians(deg))
def arcsin(value):
    return math.degrees(math.asin(value))
def arctan(value):
    return math.degrees(math.atan(value))

def min_u_theta(X, Y):
    return arctan( (Y + math.sqrt(X*X + Y*Y))/X )
def min_u_value(X, Y, g):
    return math.sqrt( g*(TargetY + math.sqrt(X*X + Y*Y)) )

def u_theta(X, Y, u, g, Sign):
    a = (g/(2*u*u))*X*X
    b = -X
    c = Y - User_h + (g*X*X)/(2*u*u)

    Discriminant = b*b - 4*a*c
    Numerator = -b
    if Sign == '+':
        Numerator += math.sqrt(Discriminant)
    elif Sign == '-':
        Numerator -= math.sqrt(Discriminant)
    return arctan(Numerator/(2*a))

def plots(u, g, theta):
    # initalisation:
    x = []
    y = []
    t = 0
    x_now = 0
    y_now = User_h
    t_step = 0.02

    x.append(x_now)
    y.append(y_now)

    while (y_now >= 0):
        x_now = u*t*cos(theta)
        y_now = u*t*sin(theta) - 0.5*g*t*t

        x.append(x_now)
        y.append(y_now)

        t += t_step

    return x, y

# user adjustables:
User_u = int(input("Enter 'u': "))
TargetX = int(input("Enter Target 'X': "))
TargetY = int(input("Enter Target 'Y': "))
User_h = 0
User_g = 9.81

# find + plot min_u values
Min_u_t = min_u_theta(TargetX, TargetY)
Min_u = min_u_value(TargetX, TargetY, User_g)
Min_u_plots = plots(Min_u, User_g, Min_u_t)
ax.plot(Min_u_plots[0], Min_u_plots[1])

# low + high ball
Low_theta = u_theta(TargetX, TargetY, User_u, User_g, '-')
High_theta = u_theta(TargetX, TargetY, User_u, User_g, '+')
Low_t_plots = plots(User_u, User_g, Low_theta)
High_t_plots = plots(User_u, User_g, High_theta)
ax.plot(Low_t_plots[0], Low_t_plots[1])
ax.plot(High_t_plots[0], High_t_plots[1])


# start max range

x = []
y = []
x_now = 0
y_now = 0
count = 0
Fraction = 1000

Max_theta = arcsin( 1/math.sqrt(2+( (2*User_g*User_h)/(User_u*User_u) )) )
Max_range = ( (User_u*User_u)/User_g ) * math.sqrt(1+(2*User_g*User_h)/(User_u*User_u))
x_step = (1/Fraction) * Max_range

# Initial Sin/Cos Theta (reduce num of calcs):
ist = sin(Max_theta)
ict = cos(Max_theta)
itt = tan(Max_theta)

# print to user as useful info
total_time = Max_range / (User_u*ict)
print("Range: " + str(Max_range))

while (count <= Fraction):
    x.append(x_now)
    y.append(y_now)

    x_now += x_step
    y_now = User_h + x_now*itt - ( (User_g/(2*User_u*User_u))*(1+itt*itt)*(x_now*x_now) )
    count += 1

ax.plot(x,y)


# start bounding parabola

x = []
y = []
x_now = 0
y_now = 0
count = 0

while (count <= Fraction):
    y_now = ((User_u*User_u)/(2*User_g))-(User_g/(2*User_u*User_u))*x_now*x_now
    x_now += x_step

    x.append(x_now)
    y.append(y_now)

    count += 1

ax.plot(x,y)


plt.show()
