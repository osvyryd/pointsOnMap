package com.softserve.tasks.task_2.task_2_1;

import com.softserve.tasks.task_2.task_2_1.IPoint;

import java.util.Collection;

/**
 * Created by BAXA on 18.10.2014.
 */
public interface IPointsFinder {
    Collection<IPoint> getPointsNearMe(IPoint targetPoint, int radius);
}
