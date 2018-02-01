package es.carloscasalar.nwp.model;

public class WatchNotFoundException extends RuntimeException {
    public WatchNotFoundException(int order) {
        super("No Watch found with order " + order);
    }
}
