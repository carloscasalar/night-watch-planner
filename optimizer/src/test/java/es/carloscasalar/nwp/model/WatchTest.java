package es.carloscasalar.nwp.model;

import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

public class WatchTest {

    @Test
    public void copy_a_watch_with_no_watchful_characters_should_generate_a_watch_with_empty_list_of_watchful_characters() {
        Watch watch = new Watch();
        watch.setLength(1);

        Watch copy = watch.copy();

        assertEquals(new ArrayList<>(), copy.getWatchfulCharacters());
    }

    @Test
    public void copy_watch_with_no_length_should_generate_no_length_watch() {
        Watch watch = new Watch();
        watch.setWatchfulCharacters(new ArrayList<>());

        Watch copy = watch.copy();

        assertEquals(null, copy.getLength());
    }
}
