import pandas as pd
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.utils import shuffle


def load_final(final_path,split_percentage):
    df = pd.read_csv(final_path)

    df = shuffle(df)
    final_x = df.drop('revenue',axis=1).values
    final_y = df['revenue'].values

    split_point = int(len(final_x) * split_percentage)
    final_X_train = final_x[:split_point]
    final_y_train = final_y[:split_point]
    final_X_test = final_x[split_point:]
    final_y_test = final_y[split_point:]

    return final_X_train, final_y_train, final_X_test, final_y_test


if __name__ == '__main__':

    csv_file = 'final.csv'
    final_X, final_y, _, _ = load_final(csv_file,split_percentage=1)

    classifiers = [KNeighborsClassifier(),
                   DecisionTreeClassifier(),
                   LinearDiscriminantAnalysis(),
                   LogisticRegression(),
                   GaussianNB(),
                   SVC()]

    classifier_accuracy_list = []
    for i, classifier in enumerate(classifiers):
        accuracies = cross_val_score(classifier, final_X, final_y, cv=5)
        classifier_accuracy_list.append((accuracies.mean(), type(classifier).__name__))

    classifier_accuracy_list = sorted(classifier_accuracy_list, reverse=True)
    for item in classifier_accuracy_list:
        print(item[1], ':', item[0])
